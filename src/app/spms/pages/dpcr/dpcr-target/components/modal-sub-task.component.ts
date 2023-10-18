import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
} from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-modal-sub-task',
  template: `
    <!-- Modal -->
    <div class="modal fade" id="modalSubTask" tabindex="-1" aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">
              CREATE SUBTASK
            </h5>
            <button
              #closeModal
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6">
                <div class="card bg-primary text-white mb-3">
                <div class="card-body p-2 ">
                  <h5 class="card-title text-white">MFO</h5>
                  <p class="card-text">{{ dpcrMFOData.mfo }}</p>
                </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card bg-success text-white mb-3">
                <div class="card-body p-2">
                  <h5 class="card-title text-white">Success Indicator</h5>
                  <p class="card-text text-white">
                    <b>{{ dpcrSIData.qty }}</b> {{ dpcrSIData.indicator }}
                  </p>
                </div>
                </div>
              </div>
            </div>

            <div
              *ngIf="dpcrSIData.qty > dpcrSIData.qtyOpcr"
              class="alert alert-danger mt-2"
              role="alert"
            >
              <i class="bx bxs-x-square"></i>&nbsp;Quantity must not be greater
              than
              <strong
                ><u>{{ dpcrSIData.qtyOpcr }}</u></strong
              >
            </div>
            <app-stepper-subtask (submitSubTask)="SubmitSubTask($event)" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
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
export class ModalSubTaskComponent {
  @ViewChild('closeModal')
  closeModal!: { nativeElement: { click: () => void } };

  dpcrService = inject(DpcrService);

  quantity: any = {};

  @Input() dpcrMFOData: any;
  @Input() dpcrSIData: any;
  @Input() error: any;

  @Output() submitSubTask = new EventEmitter<any>();

  SubmitSubTask(data:any) {
    data.mfoId = this.dpcrMFOData.mfoId

    this.submitSubTask.emit(data);
    this.handleStatus();
  }

  handleStatus() {
    setTimeout(() => {
      if (!this.error) {
        this.closeModal.nativeElement.click();
      }
    }, 500);
  }

  calculateRating() {
    this.dpcrSIData.qty5 = Math.floor(
      this.dpcrSIData.qty * 0.3 + this.dpcrSIData.qty
    );
    this.dpcrSIData.qty4 = Math.floor(
      this.dpcrSIData.qty * 0.15 + this.dpcrSIData.qty
    );
    this.dpcrSIData.qty3 = Math.floor(this.dpcrSIData.qty);
    this.dpcrSIData.qty2 = Math.floor(this.dpcrSIData.qty / 2 + 1);
    this.dpcrSIData.qty1 = Math.floor(this.dpcrSIData.qty / 2);
  }
}
