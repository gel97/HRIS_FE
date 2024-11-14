import { Component, OnInit , inject } from '@angular/core';
import { OpcrService } from 'src/app/modules/spms/service/opcr.service';
@Component({
  selector: 'app-modal-opcr-standard-report',
  template: `
  <!-- Modal -->
  <div
      class="modal fade"
      id="modalOpcrStandardReport"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen"
        style="padding: 50px 100px 50px 100px;"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <ng-container
              *ngIf="opcrStandardReport.isLoadingReport; else ShowReport"
            >
              <app-loading-spinner-grow/>
            </ng-container>
            <ng-template #ShowReport>
              <iframe
                [src]="opcrStandardReport.data"
                width="100%"
                height="100%"
                frameborder="0"
              ></iframe>
            </ng-template>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalOpcrStandardReportComponent implements OnInit {
    opcrService = inject(OpcrService);
    opcrStandardReport: any = this.opcrService.opcrStandardReport();

    ngOnInit(): void {
       
    }

  
}
