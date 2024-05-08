import {
    Component,
    EventEmitter,
    Output,
    Input,
    inject,
    ViewChild,
    OnInit
  } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
    selector: 'app-modal-add-subtask',
    template: `
        <div class="modal fade" id="modalAddSubtask" tabindex="-1" aria-hidden="true" style="z-index: 5000;">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="modalCenterTitle">
                    {{subtask.indicator}}
                </h1>
                <button #closebutton type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <div class="row">
                        <div class="col-4">
                            <label class="form-label" for="basic-default-fullname">Quantity</label>
                            <input [(ngModel)]="subtask.quantity" (ngModelChange)="trapRemaining()" type="number"
                                class="form-control" id="basic-default-fullname" placeholder="" min="1"/><br>
                        </div>
                        <div *ngIf="subtask.qtyUnit == 0" class="col-4">
                            <label class="form-label" for="basic-default-fullname">DPCR Quantity Remaining</label>
                            <input disabled [(ngModel)]="subtask.qty_rem"
                                type="number" class="form-control" id="basic-default-fullname" placeholder="" />
                        </div>
                        <div class="col-4">
                            <label class="form-label" for="basic-default-fullname">DPCR Total Quantity</label>&nbsp;
                            <span class="badge rounded-pill bg-success">{{quantityLabeler(subtask.qtyUnit)}}</span>
                            <input disabled [(ngModel)]="subtask.dpcrQuantity" type="number" class="form-control"
                                id="basic-default-fullname" placeholder="" />
                        </div>
                        <div class="col-12">
                            <div *ngIf="subtask.prompt">
                                <div class="alert alert-danger" role="alert"><i
                                        class='bx bxs-x-square'></i>&nbsp;Quantity must not exceed to
                                    REMAINING or
                                    REMAINING
                                    already
                                    depleted to zero!
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
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
                                        <td>{{'5'}}</td>
                                        <td>
                                            <div class="form-floating">
                                                <input [(ngModel)]="subtask.qty5" type="number" class="form-control"
                                                    id="floatingInput" placeholder=""
                                                    aria-describedby="floatingInputHelp" />
                                            </div>
                                        </td>
                                        <td>
                                            {{subtask.qlty5}}
                                        </td>
                                        <td>
                                            {{subtask.timely5}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{'4'}}</td>
                                        <td>
                                            <div class="form-floating">
                                                <input [(ngModel)]="subtask.qty4" type="number" class="form-control"
                                                    id="floatingInput" placeholder=""
                                                    aria-describedby="floatingInputHelp" />
                                            </div>
                                        </td>
                                        <td>
                                            {{subtask.qlty4}}
                                        </td>
                                        <td>
                                            {{subtask.timely4}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{'3'}}</td>
                                        <td>
                                            <div class="form-floating">
                                                <input [(ngModel)]="subtask.qty3" type="number" class="form-control"
                                                    id="floatingInput" placeholder=""
                                                    aria-describedby="floatingInputHelp" />
                                            </div>
                                        </td>
                                        <td>
                                            {{subtask.qlty3}}

                                        </td>
                                        <td>
                                            {{subtask.timely3}}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{'2'}}</td>
                                        <td>
                                            <div class="form-floating">
                                                <input [(ngModel)]="subtask.qty2" type="number" class="form-control"
                                                    id="floatingInput" placeholder=""
                                                    aria-describedby="floatingInputHelp" />
                                            </div>
                                        </td>
                                        <td>
                                            {{subtask.qlty2}}

                                        </td>
                                        <td>
                                            {{subtask.timely2}}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{'1'}}</td>
                                        <td>
                                            <div class="form-floating">
                                                <input [(ngModel)]="subtask.qty1" type="number" class="form-control"
                                                    id="floatingInput" placeholder=""
                                                    aria-describedby="floatingInputHelp" />
                                            </div>
                                        </td>
                                        <td>
                                            {{subtask.qlty1}}

                                        </td>
                                        <td>
                                            {{subtask.timely1}}

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
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close
                </button>
                <button (click)="PostIPCRDetails()" type="button" class="btn btn-primary">
                    Save Details
                </button>
            </div>
        </div>
    </div>
</div>
    `,
  })
  export class ModalAddSubtaskComponent implements OnInit{
    ipcrService = inject(IpcrService);

    @Input() subtask:any;

    @ViewChild('closebutton')
    closebutton!: { nativeElement: { click: () => void } };

    ngOnInit(): void {
        this.add_qty_rem = this.subtask.qty - this.ipcrService.ipcr_rem();
    }

    dpcrQuantity     : number | any;
    add_qty_rem      : number | any;

    prompt           : boolean = false;
    buttonTrap       : boolean = false;

    PostIPCRDetails() {
        if (
          this.dpcrQuantity - this.ipcrService.ipcr_rem() == 0 &&
          this.subtask.qtyUnit == 0
        ) {
          this.subtask.prompt = true;
        }
        if (this.subtask.prompt) {
          this.buttonTrap = true;
        } else {
          this.buttonTrap = false;
        }

        if (!this.buttonTrap) {     
            this.subtask.qty = this.subtask.quantity;
            this.subtask.ipcrId = localStorage.getItem('ipcrId');
            this.ipcrService.AddIPCRData(this.subtask);
            this.ipcrService.AddIPCRSubData(this.subtask);
            this.closebutton.nativeElement.click();
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

    trapRemaining() {
        if (this.subtask.qtyUnit == 0 && this.subtask.quantity > 0) {
          this.subtask.qty_rem =
            this.subtask.dpcrQuantity - this.subtask.quantity - this.ipcrService.ipcr_rem();
    
          this.subtask.qty5 = Math.floor(this.subtask.quantity * 0.3 + this.subtask.quantity);
          this.subtask.qty4 = Math.floor(this.subtask.quantity * 0.15 + this.subtask.quantity);
          this.subtask.qty3 = Math.floor(this.subtask.quantity);
          this.subtask.qty2 = Math.floor(this.subtask.quantity / 2 + 1);
          this.subtask.qty1 = Math.floor(this.subtask.quantity / 2);
    
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
    
          if (
            this.subtask.quantity > this.subtask.dpcrQuantity - this.ipcrService.ipcr_rem() ||
            this.subtask.quantity < 0
          ) {
            this.subtask.prompt = true;
          } else {
            this.subtask.prompt = false;
          }
        } else {
          if (this.subtask.quantity > this.subtask.dpcrQuantity || this.subtask.quantity < 0) {
            this.subtask.prompt = true;
          } else {
            this.subtask.prompt = false;
          }
        }
      }
   
  }
  