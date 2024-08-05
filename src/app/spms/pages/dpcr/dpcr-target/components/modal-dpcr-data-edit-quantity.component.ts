import { Component, EventEmitter, Output, Input, inject, ViewChild } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({ 
  selector: 'app-modal-dpcr-data-edit-quantity',
  template: `
     <!-- Modal -->
     <div class="modal fade" id="modalDpcrDataEditQuantity" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">
           {{dpcrSIData.qtyUnit}}   {{ dpcrSIData.indicator }}
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
          <ng-container *ngIf="dpcrSIData.qtyUnit; else showQty">
            <div><h3>Quantity: <strong>{{dpcrSIData.qty}}%</strong></h3></div>
            </ng-container>
            <ng-template #showQty>
              <div class="form-floating px-2 col-4">
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  [(ngModel)]="dpcrSIData.qty"
                  [min]="0"
                  [max]="dpcrSIData.qtyRemaining + dpcrSIData.qty"
                  (ngModelChange)="calculateRating($event)"
                  placeholder="Quantity"
                  aria-describedby="quantity"
                />
                <label for="quantity">Quantity</label>
              </div>
              <div class="col-md"  *ngIf="dpcrSIData.isDpcrMfo">
                <div class="form-check form-check-inline mt-3">
                  <input
                    (click)="dpcrSIData.qtyUnit = 0"
                    [checked]="dpcrSIData.qtyUnit === 0"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio11"
                    value="0"
                  />
                  <label class="form-check-label" for="inlineRadio11"
                    >Numeric</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    (click)="dpcrSIData.qtyUnit = 1"
                    [checked]="dpcrSIData.qtyUnit === 1"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio22"
                    value="1"
                  />
                  <label class="form-check-label" for="inlineRadio22"
                    >Percentage</label
                  >
                </div>
              </div>
              <div class="form-floating px-2 col-5" *ngIf="!dpcrSIData.isDpcrMfo">
                <input
                  type="number"
                  class="form-control"
                  id="quantityOpcr"
                  placeholder="Quantity"
                  [value]="dpcrSIData.qtyRemaining"
                  aria-describedby="quantityOpcr"
                  disabled
                />
                <label for="quantityOpcr">Remaining Quantity</label>
              </div>
              <div class="form-floating px-2 col-3" *ngIf="!dpcrSIData.isDpcrMfo">
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
                *ngIf="dpcrSIData.qtyRemaining < 0 && !dpcrSIData.isDpcrMfo"
                class="alert alert-danger mt-2"
                role="alert"
              >
                <i class="bx bxs-x-square"></i>&nbsp;Invalid Target Quantity
                <strong
                  ><u>{{ dpcrSIData.qtyRemaining }}</u></strong
                >
              </div>
            </ng-template>
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
                        [(ngModel)]="dpcrSIData.qty5"
                        class="form-control"
                        [disabled]="dpcrSIData.qtyUnit"
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
                        [disabled]="dpcrSIData.qtyUnit"
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
                        [disabled]="dpcrSIData.qtyUnit"
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
                        [disabled]="dpcrSIData.qtyUnit"
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
                        [disabled]="dpcrSIData.qtyUnit"
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
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" (click)="Submit()" class="btn btn-primary">
              Update quantity
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalDpcrDataEditQuantityComponent {
  @ViewChild('closeModal')
  closeModal!: { nativeElement: { click: () => void } };

  dpcrService = inject(DpcrService);

  quantity: any = {};

  @Input() dpcrSIData: any;
  @Input() error: any;

  @Output() submit = new EventEmitter<any>();

  Submit(){
    this.submit.emit("submit");
    this.handleStatus();
  }

  handleStatus(){
    setTimeout(() => {
      if(!this.error){
          this.closeModal.nativeElement.click();
        }    
    }, 500);
  }

  calculateRating(event:any) {
    this.dpcrSIData.qtyRemaining = (this.dpcrSIData.qtyOpcr - this.dpcrSIData.qtyCommitted) - (this.dpcrSIData.qty - this.dpcrSIData.qtyTemp);
    if (this.dpcrSIData.qty >= 7) {
      this.dpcrSIData.qty5 = Math.floor(this.dpcrSIData.qty * 0.3 + this.dpcrSIData.qty);
      this.dpcrSIData.qty4 = Math.floor(this.dpcrSIData.qty * 0.15 + this.dpcrSIData.qty);
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
