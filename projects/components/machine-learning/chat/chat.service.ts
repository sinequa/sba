import { Injectable } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { AuditEvent, AuditWebService, JsonMethodPluginService, Record, RelevantExtract, Results, TextChunksWebService, TopPassage, UserSettingsWebService } from "@sinequa/core/web-services";
import { BehaviorSubject, defaultIfEmpty, forkJoin, map, Observable, of, Subject, switchMap, tap } from "rxjs";
import { marked } from "marked";
import { ModalResult, ModalService, PromptOptions } from "@sinequa/core/modal";
import { NotificationsService } from "@sinequa/core/notification";
import { Validators } from "@angular/forms";
import { Chunk, equalChunks, insertChunk } from "./chunk";
import { ChatAttachment, ChatAttachmentWithTokens, ChatMessage, ChatResponse, DocumentChunk, GllmModel, GllmModelDescription, GllmTokens, RawMessage, RawResponse, SavedChat } from "./types";
import { extractReferences } from "./references";


@Injectable({providedIn: 'root'})
export class ChatService {

  chunkMargin = 100;

  /**
   * Global list of attachments fed by various methods from the ChatService,
   * such as: searchAttachments, addAttachments, removeAttachment...
   */
  attachments$ = new BehaviorSubject<ChatAttachmentWithTokens[]>([]);

  attachmentModel: GllmModel = 'GPT35Turbo';

  GLLM_PLUGIN = "GLLM";

  constructor(
    public textChunksService: TextChunksWebService,
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService,
    public userSettingsService: UserSettingsWebService,
    public modalService: ModalService,
    public notificationsService: NotificationsService,
    public auditService: AuditWebService
  ) {}


  // ChatGPT API

  /**
   * Calls the ChatGPT API to retrieve a new message given all previous messages
   */
  fetch(messages: ChatMessage[], name: GllmModel, temperature: number, generateTokens: number, topP: number): Observable<ChatResponse> {
    const model = {
      name,
      temperature,
      generateTokens,
      topP
    };
    const messagesHistory = this.cleanMessages(messages);
    const data = {action: "chat", model, messagesHistory, promptProtection: false};
    return this.jsonMethodWebService.post(this.GLLM_PLUGIN, data).pipe(
      map((res: RawResponse) => ({
        tokens: res.tokens,
        messagesHistory: [
          ...messages,
          this.processMessage(res.messagesHistory.at(-1)!, messages)
        ]
      })),
      tap(({tokens, messagesHistory}) => this.notifyAudit(messagesHistory, tokens))
    );
  }

  /**
   * Returns the number of tokens taken by the given text
   */
  count(text: string[], model: GllmModel): Observable<number[]> {
    const data = { action: "TokenCount", model, text };
    return this.jsonMethodWebService.post(this.GLLM_PLUGIN, data).pipe(map(res => res.tokens));
  }

  /**
   * Return the list of OpenAI models available on the server
   */
  listModels(): Observable<GllmModelDescription[]> {
    const data = { action: "listmodels" };
    return this.jsonMethodWebService.post(this.GLLM_PLUGIN, data).pipe(map(res => res.models));
  }

  /**
   * Fetch document text chunks from the standard Sinequa API
   */
  fetchChunks(id: string, chunks: {offset: number, length: number}[], sentencesBefore = 0, sentencesAfter = 0) {
    return this.textChunksService.getTextChunks(id, chunks, [], this.searchService.makeQuery(), sentencesBefore, sentencesAfter);
  }

  /**
   * Takes a list of ChatMessage and strips it from its
   * optional data ($content, $record, etc.) so that it can be sent
   * to the chat, or saved in the user settings
   */
  cleanMessages(messagesHistory: ChatMessage[]): RawMessage[] {
    return messagesHistory.map(message => ({
      role: message.role,
      content: message.content,
      display: message.display,
      $attachment: message.$attachment ? {
        recordId: message.$attachment.recordId,
        chunks: message.$attachment.chunks
      } : undefined,
      $refId: message.$refId,
      $actions: message.$actions
    }));
  }

  /**
   * Given a list of raw messages (typically from a saved chat),
   * this function reconstructs all the necessary data (records, attachments...)
   * and returns a list of ChatMessage objects ready to be displayed
   */
  restoreMessages(messages: RawMessage[]): Observable<ChatMessage[]> {
    const ids = messages.map(m => m.$attachment?.recordId!).filter(id => id);
    return this.searchService.getRecords(ids).pipe(
      map(records => messages.reduce((chatMessages, message) => {
        let attachment: ChatAttachment|undefined = undefined;
        if(message.$attachment) {
          const $record = records.find(r => r?.id === message.$attachment?.recordId);
          if($record) {
            attachment = {...message.$attachment, $record};
          }
        }
        chatMessages.push(this.processMessage(message, chatMessages, attachment));
        return chatMessages
      }, [] as ChatMessage[]))
    );
  }

  /**
   * Generates the $content and $references fields on a ChatMessage
   * If the message if from the assistant, we attempt to extract references
   * from it.
   */
  processMessage(message: RawMessage, conversation: ChatMessage[], $attachment?: ChatAttachment): ChatMessage {
    const chatMessage: ChatMessage = {...message, $content: marked(message.content), $attachment};
    if(message.role === 'assistant') {
      extractReferences(chatMessage, conversation);
    }
    return chatMessage;
  }

  /**
   * Given a list of attachments this function generates
   * a list of chat messages with the formatted attachment as content.
   */
  prepareAttachmentMessages(attachments: ChatAttachment[], conversation: ChatMessage[], display: boolean): ChatMessage[] {
    const idOffset = Math.max(0, ...conversation.map(m => m.$refId ?? 0)); // Determine the latest id used in the conversation
    return attachments.map(($attachment, i) => {
      const $refId = idOffset + i + 1;
      return {
        role: 'user',
        content: this.formatContent($refId, $attachment.$record.title, $attachment.chunks.map(c => c.text)),
        display,
        $content: '', // Attachment have their own template
        $attachment,
        $refId
      }
    });
  }

  protected formatContent(id: number, title: string, text: string[]) {
    return `<document id="${id}" title="${title}">${text.join('\n...\n')}</document>`;
  }


  // Attachment API

  /**
   * Use Sinequa to retrieve relevant passages for the given text query
   * When relevant content is retrieved, the attachments$ subject is
   * upated.
   */
  searchAttachments(results: Results, minScore = 0.5, maxPassages = 5, maxDocuments = 3, sentencesBefore = 1, sentencesAfter = 2) {
    // Select top passages
    const passages = results.topPassages?.passages
      ?.filter(p => p.score > minScore)
      .slice(0, maxPassages);

    // Get attachments either from top passages or documents
    const attachments$ = passages?.length?
      // Use passages by default, as they are the most relevant data
      this.addTopPassages(passages, results.records, sentencesBefore, sentencesAfter) :
      // Take the begining of the top-3 documents and top relevant extracts
      this.addDocuments(results.records.slice(0, maxDocuments), 2048, 3, 2, sentencesBefore, sentencesAfter);

    // Post process and return
    return attachments$.pipe(
      defaultIfEmpty([] as ChatAttachment[]) // forkJoin([]) does not emit anything!
    );
  }

  /**
   * Automatically search attachments in the results yielded by the given query
   */
  searchAttachmentsSync(query = this.searchService.query, minScore = 0.5, maxPassages = 5, maxDocuments = 3, sentencesBefore = 1, sentencesAfter = 2) {
    const event: AuditEvent = {
      type: "Chat_Autosearch",
      detail: {
        querytext: query.text
      }
    };
    return this.searchService.getResults(query, event).pipe(
      tap(results => this.searchService.setResults(results)),
      switchMap(results => this.searchAttachments(results, minScore, maxPassages, maxDocuments, sentencesBefore, sentencesAfter)),
      switchMap(attachments => this.countChunks(attachments)),
    ).subscribe(attachments => this.addAttachments(attachments));
  }

  protected passagesWithRecords(passages: TopPassage[], records: (Record | undefined)[], retrieveRecords = true): Observable<{$record: Record, location: number[]}[]> {
    const passagesWithRecords = passages
      .map(p => ({...p, $record: p.$record || records.find(r => r?.id === p.recordId)!}))
      .filter(p => p.$record);
    if(passagesWithRecords.length === passages.length || !retrieveRecords)
      return of(passagesWithRecords);
    const ids = passages.filter(p => !p.$record)
      .map(p => p.recordId);
    return this.searchService.getRecords(ids).pipe(
      switchMap(records => this.passagesWithRecords(passages, records, false))
    );
  }

  /**
   * Get the list of chunks currently present in the attachments for
   * a given record id (and return an empty list if there is none)
   */
  protected getChunks(recordId: string): DocumentChunk[] {
    const attachment = this.attachments$.getValue().find(a => a.recordId === recordId);
    return attachment?.chunks ?? [];
  }

  /**
   * Adds a list of text chunks from a record to the list of attachments.
   * If the record was already in the attachments, it will merge
   * the new chunks into the existing ones.
   */
  addChunks($record: Record, _chunks: {offset: number, length: number}[], sentencesBefore=0, sentencesAfter=0): Observable<ChatAttachment> {
    let obs: Observable<{offset: number, length: number, text?: string}[]> = of(_chunks);
    if(sentencesBefore > 0 || sentencesAfter > 0) {
      obs = this.fetchChunks($record.id, _chunks, sentencesBefore, sentencesAfter); // if needed, perform a first request that expands the given chunks
    }
    return obs.pipe(
      switchMap(chunks => {
        const existingChunks = this.getChunks($record.id);
        for(let chunk of chunks) {
          insertChunk(existingChunks, chunk.offset, chunk.length, this.chunkMargin);
        }
        if(chunks.every(c => c.text) && equalChunks(existingChunks, chunks)) {
          return of(chunks as DocumentChunk[]); // No need to perform another request
        }
        return this.fetchChunks($record.id, existingChunks);
      }),
      map(chunks => ({$record, recordId: $record.id, chunks}))
    );
  }

  /**
   * Increase the size of all the chunks in an attachment
   */
  increaseChunks(attachment: ChatAttachmentWithTokens, sentencesBefore = 2, sentencesAfter = 4) {
    return this.fetchChunks(attachment.recordId, attachment.chunks, sentencesBefore, sentencesAfter).pipe(
      switchMap(newChunks => this.addChunks(attachment.$record, newChunks)),
      switchMap(a => this.countChunks([a])),
      map(a => ({...a[0], $expanded: attachment.$expanded}))
    );
  }

  increaseChunksSync(attachment: ChatAttachmentWithTokens, sentencesBefore = 2, sentencesAfter = 4) {
    this.increaseChunks(attachment, sentencesBefore, sentencesAfter)
      .subscribe(a => this.addAttachments([a]));
  }

  /**
   * Take in a list of chat attachment and enriches it with the number of tokens of each one
   */
  countChunks(attachments: ChatAttachment[]): Observable<ChatAttachmentWithTokens[]> {
    if(attachments.length === 0) {
      return of([]);
    }
    const texts = attachments.map(a => this.formatContent(10, a.$record.title, a.chunks.map(c => c.text)));
    return this.count(texts, this.attachmentModel).pipe(
      map(counts => attachments.map((a,i) => ({...a, $tokenCount: counts[i]})))
    )
  }

  /**
   * Removes a document chunk from an attachment and update the list
   * of attachments.
   * If this was the last chunk, the attachment is removed altogether.
   */
  removeChunk(attachment: ChatAttachmentWithTokens, chunk: DocumentChunk) {
    const j = attachment.chunks.indexOf(chunk);
    if(j !== -1) {
      attachment.chunks.splice(j, 1);
      if(attachment.chunks.length === 0) {
        this.removeAttachment(attachment);
      }
      else {
        this.addAttachments([attachment]); // Will take care of replacing the existing attachment if it exists (as it should)
      };
    }
  }

  /**
   * Add a list of records as attachments
   */
  addDocuments(records: Record[], includeStart = 2048, includeExtracts = 3, includePassages = 2, sentencesBefore = 1, sentencesAfter = 3) {
    return forkJoin(records.map(record => this.addDocument(record, includeStart, includeExtracts, includePassages, sentencesBefore, sentencesAfter)));
  }

  addDocumentsSync(records: Record[], includeStart = 2048, includeExtracts = 3, includePassages = 2, sentencesBefore = 1, sentencesAfter = 3) {
    this.addDocuments(records, includeStart, includeExtracts, includePassages, sentencesBefore, sentencesAfter)
      .pipe(switchMap(doc => this.countChunks(doc)))
      .subscribe(a => this.addAttachments(a));
  }

  /**
   * Returns a (truncated) document attachment
   */
  addDocument(record: Record, includeStart = 2048, includeExtracts = 3, includePassages = 2, sentencesBefore = 1, sentencesAfter = 3): Observable<ChatAttachment> {
    const chunks: Chunk[] = [];
    if(includeStart) {
      chunks.push({offset: 0, length: includeStart});
    }
    if(includeExtracts && record.extracts) {
      const extracts = this.getExtractChunks(record.extracts)
        .slice(0, includeExtracts);
      chunks.push(...extracts);
    }
    if(includePassages && record.matchingpassages?.passages) {
      const passages = record.matchingpassages.passages
        .map(p => p.location)
        .map(([offset, length]) => ({offset, length}))
        .slice(0, includePassages);
      chunks.push(...passages);
    }
    return this.addChunks(record, chunks, sentencesBefore, sentencesAfter);
  }

  addDocumentSync(record: Record, includeStart = 2048, includeExtracts = 3, includePassages = 2, sentencesBefore = 1, sentencesAfter = 3) {
    this.addDocument(record, includeStart, includeExtracts, includePassages, sentencesBefore, sentencesAfter)
      .pipe(switchMap(doc => this.countChunks([doc])))
      .subscribe(a => this.addAttachments(a));
  }

  /**
   * Preprocess top passage to ensure they have a record object and add them
   * via the addPassages method
   */
  addTopPassages(passages: TopPassage[], records: Record[] = [], sentencesBefore=0, sentencesAfter=0): Observable<ChatAttachment[]> {
    return this.passagesWithRecords(passages, records).pipe(
      switchMap(passages => forkJoin(this.addPassages(passages, sentencesBefore, sentencesAfter))),
    )
  }

  addTopPassagesSync(passages: TopPassage[], records: Record[] = [], sentencesBefore=0, sentencesAfter=0) {
    this.addTopPassages(passages, records, sentencesBefore, sentencesAfter)
      .pipe(switchMap(doc => this.countChunks(doc)))
      .subscribe(a => this.addAttachments(a));
  }

  /**
   * Take a list of passages (typically "top passages"), group them by record id
   * and for each record generate an attachment (merged with potential existing attachments)
   */
  addPassages(passages: {$record: Record, location: number[]}[], sentencesBefore=0, sentencesAfter=0): Observable<ChatAttachment>[] {
    const passagesById: {[id: string]: {$record: Record, location: number[]}[]} = {};
    for(let passage of passages) {
      const group = passagesById[passage.$record.id] || [];
      group.push(passage);
      passagesById[passage.$record.id] = group;
    }
    return Object.values(passagesById).map(group => {
      const chunks = group.map(p => p.location).map(([offset, length]) => ({offset, length}));
      return this.addChunks(group[0].$record, chunks, sentencesBefore, sentencesAfter);
    });
  }

  addPassagesSync(passages: {$record: Record, location: number[]}[], sentencesBefore=0, sentencesAfter=0) {
    forkJoin(this.addPassages(passages, sentencesBefore, sentencesAfter))
      .pipe(switchMap(p => this.countChunks(p)))
      .subscribe(a => this.addAttachments(a));
  }

  /**
   * Add relevant extracts to the attachments.
   * There must be at least one extract.
   */
  addExtracts(record: Record, extracts: RelevantExtract[], sentencesBefore=0, sentencesAfter=0): Observable<ChatAttachment> {
    const chunks = this.getExtractChunks(extracts);
    return this.addChunks(record, chunks, sentencesBefore, sentencesAfter);
  }

  addExtractsSync(record: Record, extracts: RelevantExtract[], sentencesBefore=0, sentencesAfter=0) {
    this.addExtracts(record, extracts, sentencesBefore, sentencesAfter)
      .pipe(switchMap(e => this.countChunks([e])))
      .subscribe(a => this.addAttachments(a));
  }

  protected getExtractChunks(extracts: RelevantExtract[]) {
    return extracts.map(e => e.locations.split(',')).map(([offset, length]) => ({offset: +offset, length: +length}));
  }

  /**
   * Updates the list of attachments with a new attachment,
   * replacing the existing attachment for that record if it exists
   */
  addAttachments(attachments: ChatAttachmentWithTokens[]) {
    const existingAttachments = this.attachments$.getValue();
    for(let attachment of attachments) {
      const i = existingAttachments.findIndex(a => a.recordId === attachment.recordId);
      if(i === -1) {
        existingAttachments.push(attachment);
      }
      else {
        existingAttachments.splice(i, 1, attachment);
      }
    }
    this.attachments$.next(existingAttachments);
  }

  /**
   * Replace an old attachment with a new one
   */
  protected spliceAttachment(old: ChatAttachmentWithTokens, replace?: ChatAttachmentWithTokens) {
    const attachments = this.attachments$.value;
    const i = attachments.indexOf(old);
    if(i !== -1 ) {
      if(replace) {
        replace.$expanded = old.$expanded;
      }
      attachments.splice(i, 1, ...replace ? [replace] : []);
      this.attachments$.next(attachments);
    }
  }

  /**
   * Remove an attachment
   */
  removeAttachment(attachment: ChatAttachmentWithTokens) {
    this.spliceAttachment(attachment);
  }


  // Saved chats management

  savedChats$ = new Subject<SavedChat[]>();

  /**
   * Chats saved by the user to reopen them later
   */
  get savedChats(): SavedChat[] {
    if (!this.userSettingsService.userSettings)
      this.userSettingsService.userSettings = {};
    if (!this.userSettingsService.userSettings["savedChats"])
      this.userSettingsService.userSettings["savedChats"] = [];
    return this.userSettingsService.userSettings["savedChats"];
  }

  /**
   * Returns the saved chat with the given name
   */
  getSavedChat(name: string): SavedChat | undefined {
    return this.savedChats.find(chat => chat.name === name);
  }

  /**
   * Save a agiven chat in the user settings
   */
  saveChat(savedChat: SavedChat): void {
    const chat = this.getSavedChat(savedChat.name);
    if (chat) {
      this.deleteSavedChat(chat.name, true);
    }
    this.savedChats.push(savedChat);
    this.syncSavedChats()
      .subscribe(() => this.notificationsService.success(`${savedChat.name} was saved successfully`));
    this.auditService.notify({
      type: "Chat_Save",
      detail: {
        chat: savedChat.name
      }
    });
  }

  /**
   * Delete a given chat
   */
  deleteSavedChat(name: string, skipSync?: boolean): void {
    const chat = this.getSavedChat(name);
    if (chat) {
      this.savedChats.splice(this.savedChats.indexOf(chat), 1);
      if (!skipSync) {
        this.syncSavedChats();
        this.auditService.notify({
          type: "Chat_Delete",
          detail: {
            chat: name
          }
        });
      }
    }
  }

  syncSavedChats() {
    const savedChats = this.savedChats;
    this.savedChats$.next(savedChats);
    return this.userSettingsService.patch({ savedChats });
  }

  /**
   * Open a prompt to let the user pick a name for a saved chat.
   * If the user obliges the chat is saved.
   */
  saveChatModal(conversation: ChatMessage[], tokens: GllmTokens) {
    const messages = this.cleanMessages(conversation);
    const model: PromptOptions = {
      title: 'Save Chat',
      message: 'Enter a name for the chat',
      buttons: [],
      output: '',
      validators: [Validators.required]
    };
    this.modalService.prompt(model).then(res => {
      if (res === ModalResult.OK) {
        delete tokens.quota;
        const savedChat: SavedChat = { name: model.output, messages, tokens };
        this.saveChat(savedChat);
      }
    });
  }

  notifyAudit(messagesHistory: ChatMessage[], tokens: GllmTokens) {
    let numberOfUserMessages = 0;
    let numberOfAttachments = 0;
    let numberOfAssistantMessages = 0;
    for(let m of messagesHistory) {
      if(m.$attachment) numberOfAttachments++;
      else if(m.role === 'user') numberOfUserMessages++;
      else if (m.role === 'assistant') numberOfAssistantMessages++;
    }
    this.auditService.notify({
      type: 'Chat_Messages',
      detail: {
        message: messagesHistory.map(m => m.role + ': '+ (m.$attachment? `attachment ${m.$attachment?.$record.title}` : m.content)).join('\n\n'),
        numberOfUserMessages,
        numberOfAttachments,
        numberOfAssistantMessages,
        tokens: tokens.used
      }
    });
  }

}
