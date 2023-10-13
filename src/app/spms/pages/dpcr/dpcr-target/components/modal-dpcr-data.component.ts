import { Component, EventEmitter, Output, Input, inject, ViewChild } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-modal-dpcr-data',
  template: `
    <!-- Modal -->
    <div class="modal fade" id="modalDpcrData" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content modal-lg">
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
            <div class="form-floating px-2 col-6">
              <input
                type="number"
                class="form-control"
                id="quantity"
                [(ngModel)]="dpcrSIData.qty"
                [max]="dpcrSIData.qtyOpcr"
                (ngModelChange)="calculateRating()"
                placeholder="Quantity"
                aria-describedby="quantity"
              />
              <label for="quantity">Quantity</label>
            </div>
            <div class="form-floating px-2 col-6">
              <input
                type="number"
                class="form-control"
                id="quantityOpcr"
                placeholder="Quantity"
                [value]="dpcrSIData.qtyOpcr"
                aria-describedby="quantityOpcr"
                disabled
              />
              <label for="quantityOpcr">OPCR Quantity</label>
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
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" (click)="Submit()" class="btn btn-primary">Save changes</button>
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

  @Input() dpcrMFOData: any;
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
