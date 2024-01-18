import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { OtsService } from 'src/app/spms/service/ots.service';
@Component({
  selector: 'app-modal-ots',
  template: `
    <!-- Modal -->
    <div class="modal fade" id="modalOts" tabindex="-1" aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-scrollable modal-xl"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">
              <strong> OUTPUT TRACKING SHEET</strong>
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
            <ng-container *ngIf="otsMfoes.errorMessage; else showOts">
              <div class="alert alert-danger" role="alert">{{otsMfoes.errorMessage}}</div>
              <app-warning/>
            </ng-container>
            <ng-template #showOts>
              <div [ngClass]="ots.mfo === undefined? 'col-12':'col-6'">
                <strong>LIST OF MFO</strong>
                <div class="table-responsive mt-2">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th [width]="10">#</th>
                        <th>MFO</th>
                        <th [width]="10">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ng-container
                        *ngFor="let a of otsMfoes.data; let i = index"
                      >
                        <tr>
                          <td>
                            <strong class="text-primary">{{ i + 1 }}</strong>
                          </td>
                          <td colspan="2">
                            <strong class="text-primary">{{ a.mfo }}</strong>
                          </td>
                        </tr>
                        <ng-container *ngFor="let b of a.si; let y = index">
                          <ng-container *ngIf="b.isSubTask; else showNotSubtask">
                            <ng-container *ngFor="let c of b.st; let z = index">
                              <tr>
                                <td></td>
                                <td><strong class="text-secondaary">{{i+1}}.{{z+1}} {{ c.stMfo }}</strong></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <i
                                    class="bx bx-chevron-right cursor-pointer text-secondary"
                                  ></i>
                                  <strong class="text-primary"
                                    ><u>{{ c.qty }}{{ b.qtyUnit ? '%':''}}</u></strong
                                  >
                                  {{ c.stIndicator }}
                                </td>
                                <td>
                                <button
                                  (click)="
                                    setOtsData({
                                      mfo: c.stMfo,
                                      mfoId: c.subTaskId,
                                      subtaskId: c.subTaskId,
                                      indicator: c.stIndicator,
                                      indicatorId: c.indicatorId,
                                      qty: c.qty,
                                      dpcrDataId: c.dpcrDataId,
                                      ipcrDataId: c.ipcrDataId,
                                      ipcrId: b.ipcrId,
                                      isSubTask: b.isSubTask,
                                      opcrDataId: b.opcrDataId,
                                      qtyUnit: b.qtyUnit,
                                      qlty5: c.qlty5,
                                      qlty4: c.qlty4,
                                      qlty3: c.qlty3,
                                      qlty2: c.qlty2,
                                      qlty1: c.qlty1,
                                      timely5: c.timely5,
                                      timely4: c.timely4,
                                      timely3: c.timely3,
                                      timely2: c.timely2,
                                      timely1: c.timely1,
                                    })
                                  "
                                  class="btn btn-primary"
                                >
                                  <span class="tf-icons bx bx bx-plus"></span>
                                </button>                          
                              </tr>
                            </ng-container>
                          </ng-container >
                          <ng-template #showNotSubtask>
                            <tr>
                              <td></td>
                              <td>
                                <i
                                  class="bx bx-chevron-right cursor-pointer text-secondary"
                                ></i>
                                <strong class="text-primary"
                                  ><u>{{ b.qty }}{{ b.qtyUnit ? '%':''}}</u></strong
                                >
                                {{ b.indicator }}
                              </td>
                              <td>
                                <button
                                  (click)="
                                    setOtsData({
                                      mfo: a.mfo,
                                      mfoId: a.mfoId,
                                      indicator: b.indicator,
                                      indicatorId: b.indicatorId,
                                      qty: b.qty,
                                      dpcrDataId: b.dpcrDataId,
                                      ipcrDataId: b.ipcrDataId,
                                      ipcrId: b.ipcrId,
                                      isSubTask: b.isSubTask,
                                      opcrDataId: b.opcrDataId,
                                      qtyUnit: b.qtyUnit,
                                      qlty5: b.qlty5,
                                      qlty4: b.qlty4,
                                      qlty3: b.qlty3,
                                      qlty2: b.qlty2,
                                      qlty1: b.qlty1,
                                      timely5: b.timely5,
                                      timely4: b.timely4,
                                      timely3: b.timely3,
                                      timely2: b.timely2,
                                      timely1: b.timely1,
                                    })
                                  "
                                  class="btn btn-primary"
                                >
                                  <span class="tf-icons bx bx bx-plus"></span>
                                </button>
                              </td>
                            </tr>
                          </ng-template>
                        </ng-container>
                      </ng-container>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-6" *ngIf="ots.mfo !== undefined">
                <strong>OTS FORM</strong>
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="card bg-primary text-white mb-2">
                      <div class="card-body p-3">
                        <h5 class="card-title text-white">MFO</h5>
                        <p class="card-text">{{ ots.mfo }}</p>
                      </div>
                    </div>
                    <div class="card bg-success text-white mb-2">
                      <div class="card-body p-3">
                        <h5 class="card-title text-white">SUCCESS INDICATOR</h5>
                        <p class="card-text">
                          <strong class="text-white"
                            ><u>{{ ots.qty }}{{ ots.qtyUnit ? '%':''}}</u> 
                          </strong>
                          {{ ots.indicator }}
                        </p>
                      </div>
                    </div>
                    <div class="form-floating">
                      <textarea
                        class="form-control mb-4"
                        id="description"
                        placeholder="Description"
                        ria-describedby="description"
                        [(ngModel)]="ots.description"
                      ></textarea>
                      <label for="description">Description</label>
                    </div>
                    <div class="form-floating">
                      <input
                        type="number"
                        class="form-control mb-2"
                        id="quantity"
                        [min]="0"
                        placeholder="Quantity"
                        aria-describedby="quantity"
                        [(ngModel)]="ots.qtyR"
                      />
                      <label for="quantity">Quantity</label>
                    </div>
                    <label class="col-form-label">Quality</label>
                    <div class="row mb-2">
                      <div class="col-2">
                        <button
                          (click)="setQuality(5)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.qltyR == 5 ? 'active' : ''"
                          [disabled]="!ots.qlty5"
                        >
                          5
                        </button>
                      </div>
                      <div class="col-2">
                        <button
                          (click)="setQuality(4)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.qltyR == 4 ? 'active' : ''"
                          [disabled]="!ots.qlty4"
                        >
                          4
                        </button>
                      </div>
                      <div class="col-2">
                        <button
                          (click)="setQuality(3)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.qltyR == 3 ? 'active' : ''"
                          [disabled]="!ots.qlty3"
                        >
                          3
                        </button>
                      </div>
                      <div class="col-2">
                        <button
                          (click)="setQuality(2)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.qltyR == 2 ? 'active' : ''"
                          [disabled]="!ots.qlty2"
                        >
                          2
                        </button>
                      </div>
                      <div class="col-2">
                        <button
                          (click)="setQuality(1)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.qltyR == 1 ? 'active' : ''"
                          [disabled]="!ots.qlty1"
                        >
                          1
                        </button>
                      </div>
                    </div>
                    <label class="col-form-label">Timeliness</label>
                    <div class="row mb-4">
                      <div class="col-2">
                        <button
                          (click)="setTimeliness(5)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.timelyR == 5 ? 'active' : ''"
                          [disabled]="!ots.timely5"
                        >
                          5
                        </button>
                      </div>
                      <div class="col-2">
                        <button
                          (click)="setTimeliness(4)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.timelyR == 4 ? 'active' : ''"
                          [disabled]="!ots.timely4"
                        >
                          4
                        </button>
                      </div>
                      <div class="col-2">
                        <button
                          (click)="setTimeliness(3)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.timelyR == 3 ? 'active' : ''"
                          [disabled]="!ots.timely3"
                        >
                          3
                        </button>
                      </div>
                      <div class="col-2">
                        <button
                          (click)="setTimeliness(2)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.timelyR == 2 ? 'active' : ''"
                          [disabled]="!ots.timely2"
                        >
                          2
                        </button>
                      </div>
                      <div class="col-2">
                        <button
                          (click)="setTimeliness(1)"
                          type="button"
                          class="btn rounded-pill btn-icon btn-outline-primary"
                          [ngClass]="ots.timelyR == 1 ? 'active' : ''"
                          [disabled]="!ots.timely1"
                        >
                          1
                        </button>
                      </div>
                    </div>

                    <div class="mb-2">
                      <label
                        for="html5-datetime-local-input"
                        class="col-md-4 col-form-label"
                        >Date Accomplished</label
                      >
                      <input
                        class="form-control"
                        type="datetime-local"
                        [(ngModel)]="otsMfoes.dateDone"
                        id="html5-datetime-local-input"
                        min="2023-11-1T08:00 | date:'yyyy-MM-ddTHH:mm'"
                      />
                    </div>                 
                  </div>
                </div>
              </div>
            </ng-template>

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button *ngIf="ots.mfo !== undefined" type="button" (click)="Submit()" class="btn btn-primary">
              Submit OTS
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalOtsComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: { nativeElement: { click: () => void } };

  dpcrService = inject(DpcrService);
  otsService = inject(OtsService);

  ots: any = {};

  quantity: any = {};

  @Input() otsMfoes: any;
  @Input() error: any;

  @Output() submit = new EventEmitter<any>();

  ngOnInit(): void {
    this.initialDate();
    console.log("otsMfoes:", this.otsMfoes);
    console.log("ots:", this.ots);


  }
  Submit() {
    
    this.ots.startDate = this.otsMfoes.startDate;
    this.ots.endDate = this.otsMfoes.endDate;
    this.ots.dateDone = this.otsMfoes.dateDone;

    this.submit.emit(this.ots);
    //this.handleStatus();
    console.log(this.ots);
  }

  setOtsData(mfoData: any) {
    this.ots = mfoData;
    console.log(this.ots);
  }

  setQuality(rating: number) {
    this.ots.qltyR = rating;
  }

  setTimeliness(rating: number) {
    this.ots.timelyR = rating;
  }

  initialDate() {
    const currentDate = new Date();
    currentDate.setHours(16, 0, 0, 0);
    const formattedDate = currentDate.toISOString().slice(0, 16);

    // this.ots.endDate = formattedDate;
    // this.ots.startDate = formattedDate;
    this.otsMfoes.dateDone = formattedDate;

    //this.ots.endDate = this.otsMfoes.endDate;
    //this.ots.startDate = '2023-11-23T11:18';
    //console.log(this.ots)
  }

  handleStatus() {
    setTimeout(() => {
      if (!this.error) {
        this.closeModal.nativeElement.click();
      }
    }, 500);
  }
}
