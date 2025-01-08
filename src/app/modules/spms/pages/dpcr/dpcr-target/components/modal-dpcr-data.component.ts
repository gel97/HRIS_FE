import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
} from '@angular/core';
import { DpcrService } from 'src/app/modules/spms/service/dpcr.service';
@Component({
  selector: 'app-modal-dpcr-data',
  template: `
    <!-- Modal -->
    <div class="modal fade" id="modalDpcrData" tabindex="-1" aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">
              {{ dpcrSIData.indicator }}
            </h5>
            <button
              #closeModal
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <ng-container *ngIf="dpcrSIData.qtyUnit === 1; else showQty">
              <div class="form-floating px-2 col-4">
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  [(ngModel)]="dpcrSIData.qty"
                  (ngModelChange)="calculateRating()"
                  placeholder="Quantity"
                  aria-describedby="quantity"
                />
                <label for="quantity">Quantity</label>
              </div>
              <div
                class="form-floating px-2 col-4"
              >
                <input
                  type="number"
                  class="form-control"
                  id="qtyOpcr"
                  placeholder="Quantity"
                  [value]="dpcrSIData.prcntQty"
                  aria-describedby="qtyOpcr"
                  disabled
                />
                <label for="qtyOpcr">OPCR Percentage Quantity</label>
              </div>
            </ng-container>
            <ng-template #showQty>
              <div class="form-floating px-2 col-4">
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  [(ngModel)]="dpcrSIData.qty"
                  [max]="dpcrSIData.qtyOpcr - dpcrSIData.qtyCommitted"
                  (ngModelChange)="calculateRating()"
                  placeholder="Quantity"
                  aria-describedby="quantity"
                />
                <label for="quantity">Quantity</label>
              </div>
              <div class="col-md" *ngIf="dpcrSIData.isDpcrMfo">
                <div class="form-check form-check-inline mt-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadio1Options"
                    id="inline1Radio1"
                    [value]="false"
                    [(ngModel)]="isPrcntUnit"
                  />
                  <label class="form-check-label" for="inline1Radio1"
                    >Numeric</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadio2Options"
                    id="inline2Radio2"
                    [value]="true"
                    [(ngModel)]="isPrcntUnit"
                  />
                  <label class="form-check-label" for="inline2Radio2"
                    >Percentage</label
                  >
                </div>
              </div>
              <div
                class="form-floating px-2 col-5"
                *ngIf="!dpcrSIData.isDpcrMfo && addType === 0"
              >
                <input
                  type="number"
                  class="form-control"
                  id="quantityOpcr"
                  placeholder="Quantity"
                  [value]="dpcrSIData.qtyOpcr - dpcrSIData.qtyCommitted"
                  aria-describedby="quantityOpcr"
                  disabled
                />
                <label for="quantityOpcr">Remaining Quantity</label>
              </div>
              <div
                class="form-floating px-2 col-3"
                *ngIf="!dpcrSIData.isDpcrMfo && addType === 0"
              >
                <input
                  type="number"
                  class="form-control"
                  id="qtyOpcr"
                  placeholder="Quantity"
                  [value]="dpcrSIData.qtyOpcr"
                  aria-describedby="qtyOpcr"
                  disabled
                />
                <label for="qtyOpcr">Total Quantity</label>
              </div>
              <div
                *ngIf="
                  dpcrSIData.qty >
                    dpcrSIData.qtyOpcr - dpcrSIData.qtyCommitted &&
                  !dpcrSIData.isDpcrMfo &&
                  addType === 0
                "
                class="alert alert-danger mt-2"
                role="alert"
              >
                <i class="bx bxs-x-square"></i>&nbsp;Quantity must not be
                greater than
                <strong
                  ><u>{{
                    dpcrSIData.qtyOpcr - dpcrSIData.qtyCommitted
                  }}</u></strong
                >
              </div>
            </ng-template>
            <div class="table-responsive text-wrap">
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
                        [(ngModel)]="dpcrSIData.qty5"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{ dpcrSIData.qlty5 }}
                    </td>
                    <td>
                      {{ dpcrSIData.timely5 }}
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
                        [(ngModel)]="dpcrSIData.qty4"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{ dpcrSIData.qlty4 }}
                    </td>
                    <td>
                      {{ dpcrSIData.timely4 }}
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
                        [(ngModel)]="dpcrSIData.qty3"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{ dpcrSIData.qlty3 }}
                    </td>
                    <td>
                      {{ dpcrSIData.timely3 }}
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
                        [(ngModel)]="dpcrSIData.qty2"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{ dpcrSIData.qlty2 }}
                    </td>
                    <td>
                      {{ dpcrSIData.timely2 }}
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
                        [(ngModel)]="dpcrSIData.qty1"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{ dpcrSIData.qlty1 }}
                    </td>
                    <td>
                      {{ dpcrSIData.timely1 }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <div
              *ngIf="isEmptyUnit"
              class="alert alert-danger float-start"
              role="alert"
            >
              Please select 'Numeric' or 'Percentage'
            </div>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" (click)="Submit()" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalDpcrDataComponent {
  @ViewChild('closeModal')
  closeModal!: { nativeElement: { click: () => void } };

  dpcrService = inject(DpcrService);

  quantity: any = {};
  isEmptyUnit: boolean = false;
  isPrcntUnit: boolean = false;

  @Input() dpcrMFOData: any;
  @Input() dpcrSIData: any;
  @Input() error: any;
  @Input() addType: any;

  @Output() submit = new EventEmitter<any>();

  Submit() {
    console.log(this.dpcrSIData);
    console.log(this.isPrcntUnit);
    console.log(this.addType);

    if (this.addType === -1) {
      if (this.isPrcntUnit) {
        this.dpcrSIData.qtyUnit = 1;
        this.submit.emit('submit');
        this.handleStatus();
      } else {
        this.dpcrSIData.qtyUnit = 0;
        this.submit.emit('submit');
        this.handleStatus();
      }
    } else {
      this.submit.emit('submit');
      this.handleStatus();
    }
  }

  handleStatus() {
    setTimeout(() => {
      if (!this.error) {
        this.closeModal.nativeElement.click();
      }
    }, 500);
  }

  calculateRating() {
    if (this.dpcrSIData.qty >= 7) {
      this.dpcrSIData.qty5 = Math.floor(
        this.dpcrSIData.qty * 0.3 + this.dpcrSIData.qty
      );
      this.dpcrSIData.qty4 = Math.floor(
        this.dpcrSIData.qty * 0.15 + this.dpcrSIData.qty
      );
      this.dpcrSIData.qty3 = Math.floor(this.dpcrSIData.qty);
      this.dpcrSIData.qty2 = Math.floor(this.dpcrSIData.qty / 2 + 1);
      this.dpcrSIData.qty1 = Math.floor(this.dpcrSIData.qty / 2);
    } else if (this.dpcrSIData.qty === 6) {
      this.dpcrSIData.qty5 = 8;
      this.dpcrSIData.qty4 = 7;
      this.dpcrSIData.qty3 = 6;
      this.dpcrSIData.qty2 = 5;
      this.dpcrSIData.qty1 = 4;
    } else if (this.dpcrSIData.qty === 5) {
      this.dpcrSIData.qty5 = 7;
      this.dpcrSIData.qty4 = 6;
      this.dpcrSIData.qty3 = 5;
      this.dpcrSIData.qty2 = 4;
      this.dpcrSIData.qty1 = 3;
    } else if (this.dpcrSIData.qty === 4) {
      this.dpcrSIData.qty5 = 6;
      this.dpcrSIData.qty4 = 5;
      this.dpcrSIData.qty3 = 4;
      this.dpcrSIData.qty2 = 3;
      this.dpcrSIData.qty1 = 1;
    } else if (this.dpcrSIData.qty === 3) {
      this.dpcrSIData.qty5 = 5;
      this.dpcrSIData.qty4 = 4;
      this.dpcrSIData.qty3 = 3;
      this.dpcrSIData.qty2 = 2;
      this.dpcrSIData.qty1 = 1;
    } else if (this.dpcrSIData.qty === 2) {
      this.dpcrSIData.qty5 = 4;
      this.dpcrSIData.qty4 = 3;
      this.dpcrSIData.qty3 = 2;
      this.dpcrSIData.qty2 = 1;
      this.dpcrSIData.qty1 = 0;
    } else if (this.dpcrSIData.qty === 1) {
      this.dpcrSIData.qty5 = 1;
      this.dpcrSIData.qty4 = null;
      this.dpcrSIData.qty3 = null;
      this.dpcrSIData.qty2 = null;
      this.dpcrSIData.qty1 = 0;
    } else {
      this.dpcrSIData.qty5 = null;
      this.dpcrSIData.qty4 = null;
      this.dpcrSIData.qty3 = null;
      this.dpcrSIData.qty2 = null;
      this.dpcrSIData.qty1 = null;
    }
  }
}
