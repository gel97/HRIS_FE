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
          <div class="modal-body mt-0 pt-0">
            <div class="sticky-top bg-white col-12">
              <div
                class="btn-group sticky-top bg-white"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                  [checked]="newSubtask"
                  (click)="setCheck(true)"
                />
                <label class="btn btn-outline-primary" for="btnradio1"
                  >NEW SUBTASK</label
                >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autocomplete="off"
                  [checked]="!newSubtask"
                  (click)="setCheck(false); SetIsCommon(1)"
                />
                <label class="btn btn-outline-primary" for="btnradio2"
                  >COMMON MFO</label
                >
              </div>
            </div>
            <div *ngIf="newSubtask; else ShowCmfo">
              <div class="row mt-4">
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
              <!-- <div
                *ngIf="dpcrSIData.qty > dpcrSIData.qtyOpcr"
                class="alert alert-danger mt-2"
                role="alert"
              >
                <i class="bx bxs-x-square"></i>&nbsp;Quantity must not be
                greater than
                <strong
                  ><u>{{ dpcrSIData.qtyOpcr }}</u></strong
                >
              </div> -->
              <app-stepper-subtask (submitSubTask)="SubmitSubTask($event)" />
            </div>
            <ng-template #ShowCmfo>
              <div class="input-group my-2">
                <span class="input-group-text">
                  <div
                    class="spinner-border spinner-border-sm text-primary"
                    role="status"
                    *ngIf="dpcrDataMfoes.isSearchLoading; else showIcon"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <ng-template #showIcon>
                    <i class="tf-icons bx bx-search"></i>
                  </ng-template>
                </span>
                <input
                  type="text"
                  type="search"
                  [(ngModel)]="search"
                  (ngModelChange)="SearchMFO()"
                  placeholder="Search MFO ..."
                  id="html5-search-input"
                  class="form-control"
                  placeholder="Search Common MFO ..."
                />
              </div>
              <div class="table-responsive text-nowrap">
                <table class="table table-striped">
                  <tbody class="table-border-bottom-0">
                    <ng-container
                      *ngFor="let a of dpcrDataMfoes.data; let i = index"
                    >
                      <tr class="text-justify">
                        <td colspan="2">
                          <strong
                            *ngIf="
                              !dpcrDataMfoes.isSearchLoading &&
                                !dpcrDataMfoes.isLoading;
                              else LoadingMfo
                            "
                            class="text-primary"
                          >
                            {{ i + 1 }}.&nbsp;{{ a.mfo }}</strong
                          >
                          <ng-template #LoadingMfo>
                            <ngx-skeleton-loader
                              count="1"
                              animation="pulse"
                              appearance="line"
                              [theme]="{ margin: '0px' }"
                            ></ngx-skeleton-loader>
                          </ng-template>
                        </td>
                      </tr>
                      <ng-container *ngFor="let b of a.si; let j = index">
                        <tr
                          (click)="handClickSI(i,j)"
                        >
                          <td>
                            <div
                              *ngIf="
                                !dpcrDataMfoes.isSearchLoading &&
                                  !dpcrDataMfoes.isLoading;
                                else LoadingSI
                              "
                              class="col-12 text-justify"
                            >
                              <i class="bx bx-chevron-right"></i
                              ><strong>{{ b.qtyOpcr }}</strong
                              >&nbsp;{{ b.indicator }}
                            </div>
                            <ng-template #LoadingSI>
                              <div class="row">
                                <div class="col-2">
                                  <ngx-skeleton-loader
                                    count="1"
                                    animation="pulse"
                                    appearance="circle"
                                    [theme]="{ margin: '0px' }"
                                  ></ngx-skeleton-loader>
                                </div>
                                <div class="col-10">
                                  <ngx-skeleton-loader
                                    count="1"
                                    animation="pulse"
                                    appearance="line"
                                    [theme]="{ margin: '0px' }"
                                  ></ngx-skeleton-loader>
                                </div>
                              </div>
                            </ng-template>
                          </td>
                          <td [width]="10" *ngIf="currentSIindex !== j">
                            <button
                              *ngIf="
                                !dpcrDataMfoes.isSearchLoading &&
                                  !dpcrDataMfoes.isLoading;
                                else LoadingBtn
                              "
                              type="button"
                              (click)="setSI(b)"
                              class="btn rounded-pill btn-icon btn-primary float-end"
                            >
                              <span class="tf-icons bx bx bx-plus"></span>
                            </button>
                            <ng-template #LoadingBtn>
                              <ngx-skeleton-loader
                                count="1"
                                animation="pulse"
                                appearance="circle"
                                [theme]="{ margin: '0px' }"
                              ></ngx-skeleton-loader>
                            </ng-template>
                          </td>
                        </tr>
                        <ng-container *ngIf="currentSIindex === j && currentMfoindex === i">
                          <tr
                            *ngIf="
                              !dpcrDataMfoes.isSearchLoading &&
                              !dpcrDataMfoes.isLoading
                            "
                          >
                            <td colspan="2">
                              <div class="row">
                                <div class="col-8">
                                  <div class="form-floating px-2 col-4 my-2">
                                    <input
                                      type="number"
                                      class="form-control"
                                      id="quantity"
                                      [(ngModel)]="cmfo.qty"
                                      [min]="0"
                                      (ngModelChange)="
                                        calculateRatingCMFO($event)
                                      "
                                      placeholder="Quantity"
                                      aria-describedby="quantity"
                                    />
                                    <label for="quantity">Quantity</label>
                                  </div>
                                </div>
                                <div class="col-4 pt-3">
                                  <button
                                    class="btn btn-outline-secondary"
                                    (click)="currentSIindex = null"
                                  >
                                    Cancel
                                  </button>
                                  &nbsp;
                                  <button
                                    (click)="addCmfo(b)"
                                    class="btn btn-primary"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                              <table class="table table-bordered table-sm">
                                <thead>
                                  <tr>
                                    <td [width]="10">
                                      <strong>Rating</strong>
                                    </td>
                                    <td [width]="150" class="text-center">
                                      <strong>Quantity</strong>
                                    </td>
                                    <td class="text-center">
                                      <strong>Quality</strong>
                                    </td>
                                    <td class="text-center">
                                      <strong>Timeliness</strong>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td class="text-center">
                                      <strong>5</strong>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        [(ngModel)]="cmfo.qty5"
                                        class="form-control"
                                      />
                                    </td>
                                    <td>{{ b.qlty5 }}</td>
                                    <td>{{ b.timely5 }}</td>
                                  </tr>
                                  <tr>
                                    <td class="text-center">
                                      <strong>4</strong>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        [(ngModel)]="cmfo.qty4"
                                        class="form-control"
                                      />
                                    </td>
                                    <td>{{ b.qlty4 }}</td>
                                    <td>{{ b.timely4 }}</td>
                                  </tr>
                                  <tr>
                                    <td class="text-center">
                                      <strong>3</strong>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        [(ngModel)]="cmfo.qty3"
                                        class="form-control"
                                      />
                                    </td>
                                    <td>{{ b.qlty3 }}</td>
                                    <td>{{ b.timely3 }}</td>
                                  </tr>
                                  <tr>
                                    <td class="text-center">
                                      <strong>2</strong>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        [(ngModel)]="cmfo.qty2"
                                        class="form-control"
                                      />
                                    </td>
                                    <td>{{ b.qlty2 }}</td>
                                    <td>{{ b.timely2 }}</td>
                                  </tr>
                                  <tr>
                                    <td class="text-center">
                                      <strong>1</strong>
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        [(ngModel)]="cmfo.qty1"
                                        class="form-control"
                                      />
                                    </td>
                                    <td>{{ b.qlty1 }}</td>
                                    <td>{{ b.timely1 }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </ng-container>
                      </ng-container>
                    </ng-container>
                    <ng-container *ngIf="dpcrDataMfoes.data.length === 0">
                      <tr>
                        <td colspan="2" class="text-center">
                          <strong>No data found ...</strong>
                        </td>
                      </tr>
                    </ng-container>
                  </tbody>
                </table>
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
  dpcrDataMfoes = this.dpcrService.dpcrDataMfoes();

  quantity: any = {};
  newSubtask: boolean = true;
  search: any = '';
  currentMfoindex: any;
  currentSIindex: any;

  cmfo: any = {};

  @Input() dpcrMFOData: any;
  @Input() dpcrSIData: any;
  @Input() error: any;

  @Output() submitSubTask = new EventEmitter<any>();

  handClickSI(i:number, j:number){
    if(this.currentMfoindex === i && this.currentSIindex === j){
      this.resetIndex();
    }
    else{
      this.currentMfoindex = i;
      this.currentSIindex = j;
    }
  }

  resetIndex(){
    this.currentMfoindex = null;
    this.currentSIindex = null;
  }

  SubmitSubTask(data: any) {
    data.dpcrDataId = this.dpcrSIData.dpcrDataId;
    data.mfoId = this.dpcrMFOData.mfoId;
    data.indicatorId = this.dpcrSIData.indicatorId;
    this.submitSubTask.emit(data);
    this.handleStatus();
    this.resetIndex();
  }

  addCmfo(data: any) {
    if (this.cmfo.qty > 0) {
      data.subTaskId = data.indicatorId;
      data.dpcrDataId = this.dpcrSIData.dpcrDataId;
      data.qty = this.cmfo.qty;
      data.qty5 = this.cmfo.qty5;
      data.qty4 = this.cmfo.qty4;
      data.qty3 = this.cmfo.qty3;
      data.qty2 = this.cmfo.qty2;
      data.qty1 = this.cmfo.qty1;

      this.dpcrService.AddSubTaskCommonMfo(data);
    }
  }

  SearchMFO() {
    this.resetIndex();
    if (this.search === '' || this.search === null) {
      this.search = null;
    }
    this.dpcrService.GetDpcrDataSearchMfoes(this.search);
  }

  setSI(si: any) {
    console.log(si);
  }

  setCheck(data: boolean) {
    console.log(data);
    this.newSubtask = data;
  }

  SetIsCommon(value: number) {
    this.dpcrService.isCommonDivision.set(value);
    this.dpcrService.GetDpcrDataMfoes();
  }

  handleStatus() {
    setTimeout(() => {
      if (!this.error) {
        this.closeModal.nativeElement.click();
      }
    }, 500);
  }

  calculateRating(event: any) {
    this.dpcrSIData.qtyRemaining =
      this.dpcrSIData.qtyOpcr -
      this.dpcrSIData.qtyCommitted -
      (this.dpcrSIData.qty - this.dpcrSIData.qtyCommitted);
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

  calculateRatingCMFO(event: any) {
    this.cmfo.qty5 = Math.floor(this.cmfo.qty * 0.3 + this.cmfo.qty);
    this.cmfo.qty4 = Math.floor(this.cmfo.qty * 0.15 + this.cmfo.qty);
    this.cmfo.qty3 = Math.floor(this.cmfo.qty);
    this.cmfo.qty2 = Math.floor(this.cmfo.qty / 2 + 1);
    this.cmfo.qty1 = Math.floor(this.cmfo.qty / 2);
  }
}
