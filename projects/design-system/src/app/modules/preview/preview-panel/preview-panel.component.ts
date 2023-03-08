import { Component, Inject } from '@angular/core';
import { PreviewPopupModel } from '@sinequa/components/preview';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-preview-panel',
  templateUrl: './preview-panel.component.html'
})
export class DocPreviewPanelComponent {

  code = `<sq-preview-panel
    [query]="model.query"
    [previewData]="globalService.previewData"
    [displaySimilarDocuments]="model.displaySimilarDocuments"
    [metadata]="model.metadata">
</sq-preview-panel>`;

code2 = `constructor(@Inject(MODAL_MODEL) public model: PreviewPopupModel,
    ...
    ) {}`;

  constructor(@Inject(MODAL_MODEL) public model: PreviewPopupModel,
    public globalService: GlobalService) { }

}
