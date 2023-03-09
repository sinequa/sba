import { Injectable } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { JsonMethodPluginService, Record, RelevantExtract, TextChunksWebService, TopPassage } from "@sinequa/core/web-services";
import { BehaviorSubject, forkJoin, map, Observable } from "rxjs";
import { OpenAIModelMessage, OpenAIResponse } from "./chat.component";

export interface ChatAttachment {
  record: Record;
  query: Query;
  text: string;
  type: 'document' | 'passage' | 'extract';
  offset: number;
  length: number;
  sentencesBefore: number;
  sentencesAfter: number;
  tokenCount: number;
  payload: string;
  $expanded?: boolean;
}


@Injectable({providedIn: 'root'})
export class ChatService {
  attachments$ = new BehaviorSubject<ChatAttachment[]>([]);

  constructor(
    public textChunksService: TextChunksWebService,
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService
  ) {}

  fetch(messagesHistory: OpenAIModelMessage[], temperature: number, generateTokens: number, topP: number): Observable<OpenAIResponse> {
    const model = {
      model: "GPT35Turbo",
      temperature,
      generateTokens,
      topP
    };
    const data = {action: "chat", model, messagesHistory, promptProtection: false};
    return this.jsonMethodWebService.post("OpenAI", data);
  }

  addDocument(record: Record, query: Query) {
    // Retrieve 2048 first chars of document (+ following sentence to avoid stopping in the middle of a sentence)
    this.addAttachment('document', record, query, 0, 2048, 0, 1);
  }

  addPassages(passages: TopPassage[], query: Query) {
    forkJoin(
      passages.map(p => {
        const [offset, length] = p.location;
        return this.getAttachment('passage', p.$record!, query, offset, length);
      })
    ).subscribe(attachments => this.attachments$.next([
        ...this.attachments$.value,
        ...attachments
      ])
    );
  }

  addExtracts(extracts: RelevantExtract[], query: Query) {
    forkJoin(
      extracts.map(e => {
        const [offset, length] = e.locations.split(',');
        return this.getAttachment('extract', e['$record'], query, +offset, +length);
      })
    ).subscribe(attachments => this.attachments$.next([
        ...this.attachments$.value,
        ...attachments
      ])
    );
  }

  getAttachment(type: 'document' | 'passage' | 'extract', record: Record, query: Query, offset: number, length: number, sentencesBefore = 0, sentencesAfter = 0): Observable<ChatAttachment> {
    query = query.copy();
    delete query.page;
    return this.textChunksService.getTextChunks(record.id, [{offset, length}], [], query, sentencesBefore, sentencesAfter).pipe(
      map(chunks => {
        if(chunks?.[0]) {
          const text = chunks[0].text;
          const payload = this.formatPayload(text, type, record.title);
          return {
            type,
            record,
            query,
            text,
            offset,
            length,
            sentencesBefore,
            sentencesAfter,
            tokenCount: Math.floor(payload.length/3.5),
            payload
          };
        }
        throw new Error("Missing text chunk in web service response");
      })
    );
  }

  addAttachment(type: 'document' | 'passage' | 'extract', record: Record, query: Query, offset: number, length: number, sentencesBefore = 0, sentencesAfter = 0) {
    this.getAttachment(type, record, query, offset, length, sentencesBefore, sentencesAfter).subscribe(
      attachment => this.attachments$.next([
        ...this.attachments$.value,
        attachment
      ])
    );
  }

  formatPayload(text: string, type: 'document' | 'passage' | 'extract', title: string) {
    return `<${type} title="${title}">${text}</${type}>`;
  }

  spliceAttachment(old: ChatAttachment, replace?: ChatAttachment) {
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

  removeAttachment(attachment: ChatAttachment) {
    this.spliceAttachment(attachment);
  }

  lessTokens(attachment: ChatAttachment) {
    if(attachment.sentencesBefore === 0) {
      attachment.length = Math.floor(attachment.length * 3/4);
    }
    this.getAttachment(attachment.type, attachment.record, attachment.query, attachment.offset, attachment.length, Math.max(0, attachment.sentencesBefore-1), Math.max(0, attachment.sentencesAfter-1))
      .subscribe(a => this.spliceAttachment(attachment, a));
  }

  moreTokens(attachment: ChatAttachment) {
    this.getAttachment(attachment.type, attachment.record, attachment.query, attachment.offset, attachment.length, attachment.sentencesBefore+1, attachment.sentencesAfter+1)
      .subscribe(a => this.spliceAttachment(attachment, a));
  }

}
