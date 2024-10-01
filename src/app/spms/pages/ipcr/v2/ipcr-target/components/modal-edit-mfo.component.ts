import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
@Component({
  selector: 'app-modal-edit-mfo',
  template: `
    <div
      class="modal fade"
      id="modalEdit"
      tabindex="-1"
      aria-hidden="true"
      style="z-index: 5000;"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="modalCenterTitle">
              {{ mfo.indicator }}
            </h1>
            <button
              #closebuttonEdit
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="row">
                <div class="col-4">
                  <label class="form-label" for="basic-default-fullname"
                    >Quantity</label
                  >
                  <span
                    *ngIf="mfo.isIpcrMfo"
                    class="badge rounded-pill bg-success"
                    >{{ quantityLabeler(mfo.qtyUnit) }}</span
                  >
                  <input
                    [(ngModel)]="mfo.qty"
                    (ngModelChange)="calculateRatingEdit()"
                    type="number"
                    class="form-control"
                    id="basic-default-fullname"
                    placeholder=""
                  />
                </div>
                <div *ngIf="mfo.qtyUnit == 0 && !mfo.isIpcrMfo" class="col-4">
                  <label class="form-label" for="basic-default-fullname"
                    >DPCR Quantity Remaining</label
                  >
                  <input
                    disabled
                    [value]="mfo.totalIpcrQuantity-ipcrService.ipcr_rem()"
                    [(ngModel)]="qtyRemaining"
                    type="number"
                    class="form-control"
                    id="basic-default-fullname"
                    placeholder=""
                  />
                </div>
                <div *ngIf="!mfo.isIpcrMfo" class="col-4">
                  <label class="form-label" for="basic-default-fullname"
                    >DPCR Total Quantity</label
                  >&nbsp;
                  <span class="badge rounded-pill bg-success">{{
                    quantityLabeler(mfo.qtyUnit)
                  }}</span>
                  <input
                    disabled
                    [(ngModel)]="mfo.totalIpcrQuantity"
                    type="number"
                    class="form-control"
                    id="basic-default-fullname"
                    placeholder=""
                  />
                </div>

                <div *ngIf="!mfo.isIpcrMfo" class="col-12">
                  <br />
                  <div *ngIf="mfo.promptEdit && !mfo.qtyUnit">
                    <div class="alert alert-danger" role="alert">
                      <i class="bx bxs-x-square"></i>&nbsp;Quantity must not
                      exceed to REMAINING or REMAINING already depleted below
                      zero!
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <!-- Bootstrap Table with Header - Light -->
              <div class="card">
                <div class="table-responsive text-nowrap">
                  <table class="table">
                    <thead class="table-light">
                      <tr>
                        <th>RATING</th>
                        <th>QUANTITY</th>
                        <th>QUALITY</th>
                        <th>TIMELINESS</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      <tr>
                        <td>{{ '5' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="mfo.qty5"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ mfo.qlty5 }}
                        </td>
                        <td>
                          {{ mfo.timely5 }}
                        </td>
                      </tr>
                      <tr>
                        <td>{{ '4' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="mfo.qty4"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ mfo.qlty4 }}
                        </td>
                        <td>
                          {{ mfo.timely4 }}
                        </td>
                      </tr>
                      <tr>
                        <td>{{ '3' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="mfo.qty3"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ mfo.qlty3 }}
                        </td>
                        <td>
                          {{ mfo.timely3 }}
                        </td>
                      </tr>
                      <tr>
                        <td>{{ '2' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="mfo.qty2"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ mfo.qlty2 }}
                        </td>
                        <td>
                          {{ mfo.timely2 }}
                        </td>
                      </tr>
                      <tr>
                        <td>{{ '1' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="mfo.qty1"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ mfo.qlty1 }}
                        </td>
                        <td>
                          {{ mfo.timely1 }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- Bootstrap Table with Header - Light -->
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
            <button
              (click)="EditIPCRDetails()"
              type="button"
              class="btn btn-primary"
            >
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalEditMfoComponent implements OnInit {
  ipcrService = inject(IpcrService);

  @Input() mfo: any;

  @ViewChild('closebuttonEdit')
  closebuttonEdit!: { nativeElement: { click: () => void } };

  ngOnInit(): void {}

  EditIPCRDetails() {
    if(this.mfo.isIpcrMfo){
      this.ipcrService.PutIPCRData(this.mfo);
      this.closebuttonEdit.nativeElement.click();
    }
    if (!this.mfo.promptEdit) {
      this.ipcrService.PutIPCRData(this.mfo);
      this.closebuttonEdit.nativeElement.click();
    }
  }

  qtyRemaining: number | any;
  returnQty: number | any;
  calculateRatingEdit() {
    if (this.mfo.qtyUnit == 0) {
      this.qtyRemaining =
        this.mfo.totalIpcrQuantity -
        (this.ipcrService.ipcr_rem() - this.mfo.returnQty + this.mfo.qty);

      this.mfo.qty5 = Math.floor(
        this.mfo.qty * 0.3 + this.mfo.qty
      );
      this.mfo.qty4 = Math.floor(
        this.mfo.qty * 0.15 + this.mfo.qty
      );
      this.mfo.qty3 = Math.floor(this.mfo.qty);
      this.mfo.qty2 = Math.floor(this.mfo.qty / 2 + 1);
      this.mfo.qty1 = Math.floor(this.mfo.qty / 2);

      if (this.mfo.qty3 >= 4 && this.mfo.qty3 <= 6) {
        this.mfo.qty4 += 1;
        this.mfo.qty5 += 1;
      } else if (this.mfo.qty3 == 3) {
        this.mfo.qty4 += 1;
        this.mfo.qty5 += 2;
      } else if (this.mfo.qty3 == 2) {
        this.mfo.qty4 += 1;
        this.mfo.qty5 += 2;
        this.mfo.qty2 -= 1;
        this.mfo.qty1 -= 1;
      } else if (this.mfo.qty3 == 1) {
        this.mfo.qty5 = 1;
        this.mfo.qty4 = null;
        this.mfo.qty3 = null;
        this.mfo.qty2 = null;
        this.mfo.qty1 = null;
      } else if (this.mfo.qty <= 0) {
        this.mfo.qty5 = null;
        this.mfo.qty4 = null;
        this.mfo.qty3 = null;
        this.mfo.qty2 = null;
        this.mfo.qty1 = null;
      }

      if (this.qtyRemaining < 0 && !this.mfo.qtyUnit || this.mfo.qty < 0 && !this.mfo.qtyUnit) {
        this.mfo.promptEdit = true;
      } else {
        this.mfo.promptEdit = false;
      }
    } else {
      if (
        this.mfo.qty > this.mfo.totalIpcrQuantity && !this.mfo.qtyUnit ||
        this.mfo.qty < 0 && !this.mfo.qtyUnit
      ) {
        this.mfo.promptEdit = true;
      } else {
        this.mfo.promptEdit = false;
      }
    }
  }

  quantityLabeler(qtyUnit: number) {
    let unitLabeler;
    switch (qtyUnit) {
      case 0:
        unitLabeler = 'Numeric';
        break;

      case 1:
        unitLabeler = 'Percentage';
        break;
    }

    return unitLabeler;
  }
}
