import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MedconService } from 'src/app/modules/healthNwellness/services/medcon.service';
@Component({
  selector: 'app-modal-lab-history-report',
  template: `
    <!-- Modal Lab History -->
    <div
      class="modal fade"
      id="modalLabHistoryReport"
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
              *ngIf="labHistoryReport.isLoading; else ShowReportLab"
            >
              <p class="d-flex justify-content-center">Loading . . .</p>
            </ng-container>
            <ng-template #ShowReportLab>
              <iframe
                [src]="labHistoryReport.data"
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
export class ModalLabHistoryReportComponent implements OnInit {
  medconService = inject(MedconService);
  labHistoryReport: any = this.medconService.labHistoryReport();

  ngOnInit(): void {}
}
