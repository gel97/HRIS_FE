import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
} from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-sub-task',
  template: `
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalEditSubTask"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle"><b>EDIT SUBTASK</b></h5>
            <button
              #closeModal
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form [formGroup]="formGroup">
              <mat-form-field class="m-0" style="width: 100%;">
                <mat-label>MFO</mat-label>
                <input
                  matInput
                  [(ngModel)]="data.stMfo"
                  formControlName="stMfo"
                  required
                />
              </mat-form-field>
              <mat-form-field class="m-0" style="width: 100%;">
                <mat-label>Success Indicator</mat-label>
                <input
                  matInput
                  [(ngModel)]="data.stIndicator"
                  formControlName="stIndicator"
                  required
                />
              </mat-form-field>
              <div class="row">
                <div class="col-6">
                  <mat-form-field class="m-0" style="width: 100%;">
                    <mat-label>Quantity</mat-label>
                    <input
                      matInput
                      type="number"
                      [(ngModel)]="data.qty"
                      formControlName="qty"
                      required
                    />
                  </mat-form-field>
                </div>
                <div class="col-6">
                  <div class="form-check mt-3">
                    <input
                      name="default-radio-1"
                      class="form-check-input"
                      type="radio"
                      value="0"
                      id="defaultRadio1"
                      (change)="onChangeUnit($event)"
                      [checked]="data.qtyUnit === 0 ? true : false"
                    />
                    <label class="form-check-label" for="defaultRadio1">
                      Numeric
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      name="default-radio-1"
                      class="form-check-input"
                      type="radio"
                      value="1"
                      id="defaultRadio2"
                      (change)="onChangeUnit($event)"
                      [checked]="data.qtyUnit === 1 ? true : false"
                    />
                    <label class="form-check-label" for="defaultRadio2">
                      Percentage
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th [width]="10">Rating</th>
                  <th>Quantity</th>
                  <th>Quality</th>
                  <th>Timeliness</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr>
                  <td>
                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                    <strong>5</strong>
                  </td>
                  <td>
                    <input
                      type="number"
                      [(ngModel)]="data.qty5"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty5"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely5"
                      class="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                    <strong>4</strong>
                  </td>
                  <td>
                    <input
                      type="number"
                      [(ngModel)]="data.qty4"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty4"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely4"
                      class="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                    <strong>3</strong>
                  </td>
                  <td>
                    <input
                      type="number"
                      [(ngModel)]="data.qty3"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty3"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely3"
                      class="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                    <strong>2</strong>
                  </td>
                  <td>
                    <input
                      type="number"
                      [(ngModel)]="data.qty2"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty2"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely2"
                      class="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                    <strong>1</strong>
                  </td>
                  <td>
                    <input
                      type="number"
                      [(ngModel)]="data.qty1"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty1"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely1"
                      class="form-control"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" (click)="EditSubtask()" class="btn btn-primary">Save changes</button>

          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalEditSubTaskComponent {
  @ViewChild('closeModal')
  closeModal!: { nativeElement: { click: () => void } };

  dpcrService = inject(DpcrService);
  formBuilder = inject(FormBuilder);

  quantity: any = {};

  @Input() error: any;
  @Input() data: any;

  @Output() submitSubTask = new EventEmitter<any>();

  formGroup = this.formBuilder.group({
    stMfo: ['', Validators.required],
    stIndicator: ['', Validators.required],
    qty: ['', Validators.required],
  });

  EditSubtask() {
    this.dpcrService.EditSubTask(this.data);
    this.handleStatus();
  }

  onChangeUnit(event: Event) {
    const target = event.target as HTMLInputElement;
    this.data.qtyUnit = target.value;
  }

  handleStatus() {
    setTimeout(() => {
      if (!this.error) {
        this.closeModal.nativeElement.click();
      }
    }, 500);
  }

  calculateRating() {
    //   this.dpcrSIData.qty5 = Math.floor(
    //     this.dpcrSIData.qty * 0.3 + this.dpcrSIData.qty
    //   );
    //   this.dpcrSIData.qty4 = Math.floor(
    //     this.dpcrSIData.qty * 0.15 + this.dpcrSIData.qty
    //   );
    //   this.dpcrSIData.qty3 = Math.floor(this.dpcrSIData.qty);
    //   this.dpcrSIData.qty2 = Math.floor(this.dpcrSIData.qty / 2 + 1);
    //   this.dpcrSIData.qty1 = Math.floor(this.dpcrSIData.qty / 2);
  }
}
