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
            <h5 class="modal-title" id="modalScrollableTitle">
              <b>EDIT SUBTASK</b>
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
                      (ngModelChange)="calculateRating()"
                      formControlName="qty"
                      required
                    />
                  </mat-form-field>
                </div>
                <div class="col-2">
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
                <div class="col-4 form-check mt-3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="defaultCheck1"
                    [checked]="data.isFiveStndrd"
                    (change)="handleIsFiveStandard($event)"
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    Set standard to five rating
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th [width]="10">Rating</th>
                  <th [width]="150">Quantity</th>
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
            <button
              type="button"
              (click)="EditSubtask()"
              class="btn btn-primary"
            >
              Save changes
            </button>
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

  handleIsFiveStandard(e: any) {
    // console.log(e.target.checked)
    if (e.target.checked) {
      this.data.isFiveStndrd = 1;
    } else {
      this.data.isFiveStndrd = 0;
    }
  }

  calculateRating() {
    if (this.data.qty >= 7) {
      this.data.qty5 = Math.floor(this.data.qty * 0.3 + this.data.qty);
      this.data.qty4 = Math.floor(this.data.qty * 0.15 + this.data.qty);
      this.data.qty3 = Math.floor(this.data.qty);
      this.data.qty2 = Math.floor(this.data.qty / 2 + 1);
      this.data.qty1 = Math.floor(this.data.qty / 2);
    } else if (this.data.qty === 6) {
      this.data.qty5 = 8;
      this.data.qty4 = 7;
      this.data.qty3 = 6;
      this.data.qty2 = 5;
      this.data.qty1 = 4;
    } else if (this.data.qty === 5) {
      this.data.qty5 = 7;
      this.data.qty4 = 6;
      this.data.qty3 = 5;
      this.data.qty2 = 4;
      this.data.qty1 = 3;
    } else if (this.data.qty === 4) {
      this.data.qty5 = 6;
      this.data.qty4 = 5;
      this.data.qty3 = 4;
      this.data.qty2 = 3;
      this.data.qty1 = 1;
    } else if (this.data.qty === 3) {
      this.data.qty5 = 5;
      this.data.qty4 = 4;
      this.data.qty3 = 3;
      this.data.qty2 = 2;
      this.data.qty1 = 1;
    } else if (this.data.qty === 2) {
      this.data.qty5 = 4;
      this.data.qty4 = 3;
      this.data.qty3 = 2;
      this.data.qty2 = 1;
      this.data.qty1 = 0;
    } else if (this.data.qty === 1) {
      this.data.qty5 = 1;
      this.data.qty4 = null;
      this.data.qty3 = null;
      this.data.qty2 = null;
      this.data.qty1 = 0;
    } else {
      this.data.qty5 = null;
      this.data.qty4 = null;
      this.data.qty3 = null;
      this.data.qty2 = null;
      this.data.qty1 = null;
    }
  }
}
