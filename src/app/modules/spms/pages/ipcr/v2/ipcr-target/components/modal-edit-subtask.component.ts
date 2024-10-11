import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { IpcrService } from 'src/app/modules/spms/service/ipcr.service';
@Component({
  selector: 'app-modal-edit-subtask',
  template: `
    <div
      class="modal fade"
      id="modalEditSubtask"
      tabindex="-1"
      aria-hidden="true"
      style="z-index: 5000;"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="modalCenterTitle">
              {{ subtask.stIndicator }}
            </h1>
            <button
              #closebuttonEditST
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
                    >Quantity Subtask</label
                  >
                  <input
                    [(ngModel)]="subtask.qty"
                    (ngModelChange)="calculateRatingSTEdit()"
                    type="number"
                    class="form-control"
                    id="basic-default-fullname"
                    placeholder=""
                  />
                </div>
                <div *ngIf="subtask.qtyUnit == 0" class="col-4">
                  <label class="form-label" for="basic-default-fullname"
                    >DPCR Quantity Subtask Remaining</label
                  >
                  <input
                    disabled
                    [value]="
                      subtask.totalIpcrQuantityST -
                      ipcrService.ipcrST_rem()
                    "
                    [(ngModel)]="subtask.qtyRemainingST"
                    type="number"
                    class="form-control"
                    id="basic-default-fullname"
                    placeholder=""
                  />
                </div>
                <div class="col-4">
                  <label class="form-label" for="basic-default-fullname"
                    >DPCR Total Subtask</label
                  >&nbsp;
                  <span class="badge rounded-pill bg-success">{{
                    quantityLabeler(subtask.qtyUnit)
                  }}</span>
                  <input
                    disabled
                    [(ngModel)]="subtask.totalIpcrQuantityST"
                    type="number"
                    class="form-control"
                    id="basic-default-fullname"
                    placeholder=""
                  />
                </div>
                <div class="col-12">
                  <br />
                  <div *ngIf="subtask.promptEditST">
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
                              [(ngModel)]="subtask.qty5"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ subtask.qlty5 }}
                        </td>
                        <td>
                          {{ subtask.timely5 }}
                        </td>
                      </tr>
                      <tr>
                        <td>{{ '4' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="subtask.qty4"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ subtask.qlty4 }}
                        </td>
                        <td>
                          {{ subtask.timely4 }}
                        </td>
                      </tr>
                      <tr>
                        <td>{{ '3' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="subtask.qty3"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ subtask.qlty3 }}
                        </td>
                        <td>
                          {{ subtask.timely3 }}
                        </td>
                      </tr>
                      <tr>
                        <td>{{ '2' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="subtask.qty2"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ subtask.qlty2 }}
                        </td>
                        <td>
                          {{ subtask.timely2 }}
                        </td>
                      </tr>
                      <tr>
                        <td>{{ '1' }}</td>
                        <td>
                          <div class="form-floating">
                            <input
                              [(ngModel)]="subtask.qty1"
                              type="number"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              aria-describedby="floatingInputHelp"
                            />
                          </div>
                        </td>
                        <td>
                          {{ subtask.qlty1 }}
                        </td>
                        <td>
                          {{ subtask.timely1 }}
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
              (click)="EditIPCRSubDetails()"
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
export class ModalEditSubtaskComponent implements OnInit {
  ipcrService = inject(IpcrService);

  @Input() subtask: any;

  @ViewChild('closebuttonEditST')
  closebuttonEditST!: { nativeElement: { click: () => void } };

  ngOnInit(): void {}

  EditIPCRSubDetails() {
    if (!this.subtask.promptEditST) {
      this.ipcrService.PutIPCRSubData(this.subtask);
      this.closebuttonEditST.nativeElement.click();
    }
  }

  promptEditST: boolean = false;
  returnQtyST: number | any;
  calculateRatingSTEdit() {
    if (this.subtask.qtyUnit == 0) {
      this.subtask.qtyRemainingST =
        this.subtask.totalIpcrQuantityST -
        (this.ipcrService.ipcrST_rem() -
          this.subtask.returnQtyST +
          this.subtask.qty);
      this.subtask.qty5 = Math.floor(
        this.subtask.qty * 0.3 + this.subtask.qty
      );
      this.subtask.qty4 = Math.floor(
        this.subtask.qty * 0.15 + this.subtask.qty
      );
      this.subtask.qty3 = Math.floor(this.subtask.qty);
      this.subtask.qty2 = Math.floor(this.subtask.qty / 2 + 1);
      this.subtask.qty1 = Math.floor(this.subtask.qty / 2);

      if (this.subtask.qty3 >= 4 && this.subtask.qty3 <= 6) {
        this.subtask.qty4 += 1;
        this.subtask.qty5 += 1;
      } else if (this.subtask.qty3 == 3) {
        this.subtask.qty4 += 1;
        this.subtask.qty5 += 2;
      } else if (this.subtask.qty3 == 2) {
        this.subtask.qty4 += 1;
        this.subtask.qty5 += 2;
        this.subtask.qty2 -= 1;
        this.subtask.qty1 -= 1;
      } else if (this.subtask.qty3 == 1) {
        this.subtask.qty5 = 1;
        this.subtask.qty4 = null;
        this.subtask.qty3 = null;
        this.subtask.qty2 = null;
        this.subtask.qty1 = null;
      } else if (this.subtask.qty <= 0) {
        this.subtask.qty5 = null;
        this.subtask.qty4 = null;
        this.subtask.qty3 = null;
        this.subtask.qty2 = null;
        this.subtask.qty1 = null;
      }

      if (this.subtask.qtyRemainingST < 0 || this.subtask.qty < 0) {
        this.subtask.promptEditST = true;
      } else {
        this.subtask.promptEditST = false;
      }
    } else {
      if (
        this.subtask.qty > this.subtask.totalIpcrQuantityST ||
        this.subtask.qty < 0
      ) {
        this.subtask.promptEditST = true;
      } else {
        this.subtask.promptEditST = false;
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
