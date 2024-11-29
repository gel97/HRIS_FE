import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { IpcrService } from 'src/app/modules/spms/service/ipcr.service';

@Component({
  selector: 'app-canvas-target-mfoes',
  template: `
    <div class="col-lg-6 col-md-6">
      <div class="mt-3">
        <div
          class="offcanvas offcanvas-end"
          style="width: 40%;
                border-left: 1px solid rgba(67, 89, 113, 0.2);
                border-left-width: 5px;
                border-left-style: solid;
                border-left-color: rgba(67, 89, 113, 0.2);
                z-index: 900;
                "
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvasIpcrMfoes"
          aria-labelledby="offcanvasIpcrLabel"
        >
          <div class="offcanvas-header">
            <h1 id="offcanvasEndLabel" class="offcanvas-title">
              MAJOR FINAL OUTPUT <ng-container *ngIf="mfoes.divisionName !== ''">/ {{mfoes.divisionName | truncate : 10}} </ng-container>
            </h1>
            <button
              (click)="handleExpandCard()"
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body px-0 mx-0 py-0 flex-grow-0">
            <div class="col-xl-12">
              <div class="nav-align-top mb-4">
                <div class="sticky-top bg-white">
                  <ul class="nav nav-pills mb-3 nav-fill mx-2" role="tablist">
                    <li class="nav-item">
                      <button
                        (click)="setMFOs(0)"
                        type="button"
                        class="nav-link"
                        [ngClass]="ipcrService.isCommon() === 0 ? 'active' : ''"
                        role="tab"
                        data-bs-toggle="tab"
                        data-bs-target="#navs-pills-justified-home"
                        aria-controls="navs-pills-justified-home"
                        aria-selected="false"
                      >
                        <ng-container>
                          <i class="bx bx-grid-alt"></i> DIVISION MFO
                          <span
                            *ngIf="ipcrService.isCommon() === 0"
                            class="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger"
                          >
                            {{ mfoes.data.length }}
                          </span>
                        </ng-container>
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        (click)="setMFOs(1)"
                        type="button"
                        class="nav-link"
                        [ngClass]="ipcrService.isCommon() === 1 ? 'active' : ''"
                        role="tab"
                        data-bs-toggle="tab"
                        data-bs-target="#navs-pills-justified-profile"
                        aria-controls="navs-pills-justified-profile"
                        aria-selected="true"
                      >
                        <ng-container>
                          <i class="bx bx-grid-alt"></i> COMMON
                          <span
                            *ngIf="ipcrService.isCommon() === 1"
                            class="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger"
                          >
                            {{ mfoes.data.length }}
                          </span>
                        </ng-container>
                      </button>
                    </li>
                  </ul>
                  <!-- <div class="mx-2">
                    <div class="input-group ">
                      <span class="input-group-text">
                        <div
                          class="spinner-border spinner-border-sm text-primary"
                          role="status"
                          *ngIf="mfoes.isSearchLoading; else showIcon"
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
                        placeholder="Search MFO ..."
                      />
                    </div>
                  </div> -->
                  <div class="input-group px-2">
                    <span class="input-group-text">
                      <i class="tf-icons bx bx-search"></i>
                    </span>
                    <input
                      type="text"
                      type="search"
                      [(ngModel)]="searchMfo"
                      placeholder="Search MFO ..."
                      id="html5-search-input"
                      class="form-control"
                      placeholder="Search MFO ..."
                    />
                  </div>
                </div>
                <div class="tab-content px-0 mt-2 pb-0">
                  <div
                    class="tab-pane fade"
                    [ngClass]="
                      ipcrService.isCommon() === 0 ? 'show active' : ''
                    "
                    id="navs-pills-justified-home"
                    role="tabpanel"
                  >                

                    <div class="table-responsive text-wrap">
                      <table class="table table-hover">
                        <tbody class="table-border-bottom-0">
                          <ng-container
                            *ngFor="let a of mfoes.data | filter:'mfo':searchMfo; let i = index"
                          >
                            <tr class="text-justify">
                              <td colspan="2">
                                <div class="x-space-between">
                                  <div>
                                    <strong
                                      *ngIf="
                                        !mfoes.isSearchLoading &&
                                          !mfoes.isLoading;
                                        else LoadingMfo
                                      "
                                      class="text-primary"
                                    >
                                      {{ i + 1 }}.&nbsp;{{ a.mfo }}</strong
                                    >
                                    <ng-template #LoadingMfo>
                                      <div class="col-12">
                                        <ngx-skeleton-loader
                                          count="1"
                                          animation="pulse"
                                          appearance="line"
                                          [theme]="{ margin: '0px' }"
                                        ></ngx-skeleton-loader>
                                      </div>
                                    </ng-template>
                                  </div>
                                  <div
                                    *ngIf="
                                      !mfoes.isSearchLoading && !mfoes.isLoading
                                    "
                                  >
                                    <small
                                      *ngIf="
                                        a.categoryId !== null;
                                        else showDpcrCat
                                      "
                                      class="badge rounded-pill float-end cursor-pointer"
                                      [ngClass]="
                                        a.categoryId == '1'
                                          ? 'bg-label-success'
                                          : a.categoryId == '2'
                                          ? 'bg-label-primary'
                                          : a.categoryId == '3'
                                          ? 'bg-label-warning'
                                          : 'bg-label-secondary'
                                      "
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      {{ displayCatergory(a.categoryId) }}
                                    </small>
                                    <ng-template #showDpcrCat>
                                      <small
                                        class="badge rounded-pill float-end cursor-pointer"
                                        [ngClass]="
                                          a.dpcrCategoryId == '1'
                                            ? 'bg-label-success'
                                            : a.dpcrCategoryId == '2'
                                            ? 'bg-label-primary'
                                            : a.dpcrCategoryId == '3'
                                            ? 'bg-label-warning'
                                            : 'bg-label-secondary'
                                        "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        {{ displayCatergory(a.dpcrCategoryId) }}
                                      </small>
                                    </ng-template>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <ng-container *ngFor="let b of a.si; let j = index">
                              <tr>
                                <td>
                                  <div
                                    *ngIf="
                                      !mfoes.isSearchLoading &&
                                        !mfoes.isLoading;
                                      else LoadingSI
                                    "
                                    class="col-12 text-justify"
                                    style="margin-left: 20px;"
                                  >
                                    <b>{{ i + 1 }}.{{ j + 1 }}</b>
                                    <i class="bx bx-chevron-right"></i
                                    ><strong
                                      ><u
                                        >{{ b.qty }}{{ b.qtyUnit ? '%' : '' }}
                                      </u></strong
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
                                <td [width]="10">
                                  <ng-container
                                    *ngIf="
                                      !mfoes.isSearchLoading &&
                                        !mfoes.isLoading;
                                      else LoadingBtn
                                    "
                                  >
                                    <button
                                      *ngIf="
                                        b.isSubTask === 0 ||
                                        b.isSubTask === null
                                      "
                                      type="button"
                                      (click)="SetIpcrDataObj(a, b, i, j)"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalAddMfo"
                                      class="btn rounded-pill btn-icon btn-primary float-end"
                                    >
                                      <span
                                        class="tf-icons bx bx bx-plus"
                                      ></span>
                                    </button>
                                  </ng-container>

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
                              <ng-container *ngIf="b.isSubTask === 1">
                                <tr class="bg-custom-gray">
                                  <td colspan="2" class="text-black">
                                    <b
                                      *ngIf="
                                        !mfoes.isSearchLoading &&
                                          !mfoes.isLoading;
                                        else LoadingST
                                      "
                                      style="margin-left: 50px;"
                                      >SUBTASK MFO</b
                                    >
                                    <ng-template #LoadingST>
                                      <ngx-skeleton-loader
                                        count="1"
                                        animation="pulse"
                                        appearance="line"
                                        [theme]="{ margin: '0px' }"
                                      ></ngx-skeleton-loader>
                                    </ng-template>
                                  </td>
                                </tr>
                                <ng-container
                                  *ngFor="let c of b.st; let l = index"
                                >
                                  <tr class="bg-custom-ligth-gray">
                                    <td colspan="2">
                                      <strong
                                        class="text-secondary"
                                        *ngIf="
                                          !mfoes.isSearchLoading &&
                                            !mfoes.isLoading;
                                          else LoadingStMfo
                                        "
                                        style="margin-left: 50px;"
                                      >
                                        {{ i + 1 }}.{{ j + 1 }}.{{
                                          l + 1
                                        }}&nbsp;{{ c.stMfo }}
                                      </strong>
                                      <ng-template #LoadingStMfo>
                                        <ngx-skeleton-loader
                                          count="1"
                                          animation="pulse"
                                          appearance="line"
                                          [theme]="{ margin: '0px' }"
                                        ></ngx-skeleton-loader>
                                      </ng-template>
                                    </td>
                                  </tr>
                                  <tr class="bg-custom-ligth-gray">
                                    <td>
                                      <div
                                        *ngIf="
                                          !mfoes.isSearchLoading &&
                                            !mfoes.isLoading;
                                          else LoadingStSi
                                        "
                                        style="margin-left: 60px;"
                                      >
                                        <i class="bx bx-chevron-right"></i>
                                        <strong
                                          ><u
                                            >{{ c.qty
                                            }}{{ c.qtyUnit ? '%' : '' }}
                                          </u></strong
                                        >&nbsp;
                                        {{ c.stIndicator }}
                                      </div>
                                      <ng-template #LoadingStSi>
                                        <ngx-skeleton-loader
                                          count="1"
                                          animation="pulse"
                                          appearance="line"
                                          [theme]="{ margin: '0px' }"
                                        ></ngx-skeleton-loader>
                                      </ng-template>
                                    </td>
                                    <td>
                                      <ng-container
                                        *ngIf="
                                          !mfoes.isSearchLoading &&
                                            !mfoes.isLoading;
                                          else LoadingBtnSt
                                        "
                                      >
                                        <button
                                          type="button"
                                          (click)="
                                            SetIpcrDataSubtaskObj(
                                              c,
                                              true,
                                              b.categoryId ?? a.dpcrCategoryId
                                            )
                                          "
                                          data-bs-toggle="modal"
                                          data-bs-target="#modalAddSubtask"
                                          class="btn rounded-pill btn-icon btn-primary float-end"
                                        >
                                          <span
                                            class="tf-icons bx bx bx-plus"
                                          ></span>
                                        </button>
                                      </ng-container>
                                      <ng-template #LoadingBtnSt>
                                        <ngx-skeleton-loader
                                          count="1"
                                          animation="pulse"
                                          appearance="circle"
                                          [theme]="{ margin: '0px' }"
                                        ></ngx-skeleton-loader>
                                      </ng-template>
                                    </td>
                                  </tr>
                                </ng-container>
                                <ng-container
                                  *ngFor="let c of b.stCmfo; let l = index"
                                >
                                  <tr class="bg-custom-ligth-gray">
                                    <td colspan="2">
                                      <strong
                                        class="text-secondary"
                                        *ngIf="
                                          !mfoes.isSearchLoading &&
                                            !mfoes.isLoading;
                                          else LoadingStCMfo
                                        "
                                      >
                                        {{ i + 1 }}.{{
                                          b.st.length + l + 1
                                        }}&nbsp;{{ c.mfo }}
                                      </strong>
                                      <ng-template #LoadingStCMfo>
                                        <ngx-skeleton-loader
                                          count="1"
                                          animation="pulse"
                                          appearance="line"
                                          [theme]="{ margin: '0px' }"
                                        ></ngx-skeleton-loader>
                                      </ng-template>
                                    </td>
                                  </tr>
                                  <tr
                                    *ngFor="let d of c.si; let ll = index"
                                    class="bg-custom-ligth-gray"
                                  >
                                    <td>
                                      <div
                                        *ngIf="
                                          !mfoes.isSearchLoading &&
                                            !mfoes.isLoading;
                                          else LoadingStCmfoSi
                                        "
                                      >
                                        <i class="bx bx-chevron-right"></i>
                                        <strong
                                          >{{ d.qty
                                          }}{{ d.qtyUnit ? '%' : '' }} </strong
                                        >&nbsp;
                                        {{ d.indicator }}
                                      </div>
                                      <ng-template #LoadingStCmfoSi>
                                        <ngx-skeleton-loader
                                          count="1"
                                          animation="pulse"
                                          appearance="line"
                                          [theme]="{ margin: '0px' }"
                                        ></ngx-skeleton-loader>
                                      </ng-template>
                                    </td>
                                    <td>
                                      <ng-container
                                        *ngIf="
                                          !mfoes.isSearchLoading &&
                                            !mfoes.isLoading;
                                          else LoadingBtnStCmfo
                                        "
                                      >
                                        <button
                                          type="button"
                                          (click)="
                                            SetIpcrDataSubtaskObj(
                                              d,
                                              false,
                                              b.categoryId
                                            )
                                          "
                                          data-bs-toggle="modal"
                                          data-bs-target="#modalAddSubtask"
                                          class="btn rounded-pill btn-icon btn-primary float-end"
                                        >
                                          <span
                                            class="tf-icons bx bx bx-plus"
                                          ></span>
                                        </button>
                                      </ng-container>
                                      <ng-template #LoadingBtnStCmfo>
                                        <ngx-skeleton-loader
                                          count="1"
                                          animation="pulse"
                                          appearance="circle"
                                          [theme]="{ margin: '0px' }"
                                        ></ngx-skeleton-loader>
                                      </ng-template>
                                    </td>
                                  </tr>
                                </ng-container>
                              </ng-container>
                            </ng-container>
                          </ng-container>
                          <ng-container *ngIf="mfoes.data.length === 0">
                            <tr>
                              <td colspan="2" class="text-center">
                                <strong *ngIf="mfoes.errorMessage === ''; else ErrorMsg">No data found ...</strong>
                                <ng-template #ErrorMsg>
                                  <strong class="text-danger">{{mfoes.errorMessage}}</strong>
                                </ng-template>
                              </td>
                            </tr>
                          </ng-container>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    [ngClass]="
                      ipcrService.isCommon() === 1 ? 'show active' : ''
                    "
                    id="navs-pills-justified-profile"
                    role="tabpanel"
                  >
                    <div>
                      <table class="table table-hover">
                        <tbody class="table-border-bottom-0">
                          <ng-container
                            *ngFor="let a of mfoes.data | filter:'mfo':searchMfo; let i = index"
                          >
                            <tr class="text-justify">
                              <td colspan="2">
                                <div
                                  class="x-space-between"
                                  *ngIf="
                                    !mfoes.isSearchLoading && !mfoes.isLoading;
                                    else LoadingMfo
                                  "
                                >
                                  <strong class="text-primary">
                                    {{ i + 1 }}.&nbsp;{{ a.mfo }}</strong
                                  >
                                  <small
                                    class="badge rounded-pill float-end cursor-pointer"
                                    [ngClass]="
                                      a.categoryId == '1'
                                        ? 'bg-label-success'
                                        : a.categoryId == '2'
                                        ? 'bg-label-primary'
                                        : a.categoryId == '3'
                                        ? 'bg-label-warning'
                                        : 'bg-label-secondary'
                                    "
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    {{ displayCatergory(a.categoryId) }}
                                  </small>
                                </div>

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
                            <tr *ngFor="let b of a.si; let j = index">
                              <td>
                                <div
                                  *ngIf="
                                    !mfoes.isSearchLoading && !mfoes.isLoading;
                                    else LoadingSI
                                  "
                                  class="col-12 text-justify"
                                >
                                  <i class="bx bx-chevron-right"></i
                                  ><strong *ngIf="!a.isIpcrMfo"
                                    >{{ b.qtyOpcr
                                    }}{{ b.qtyUnit ? '%' : '' }}</strong
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
                              <td [width]="10">
                                <button
                                  *ngIf="
                                    !mfoes.isSearchLoading && !mfoes.isLoading;
                                    else LoadingBtn
                                  "
                                  type="button"
                                  (click)="SetIpcrDataObj(a, b, i, j)"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalAddMfo"
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
                          </ng-container>
                          <ng-container *ngIf="mfoes.data.length === 0">
                            <tr>
                              <td colspan="2" class="text-center">
                                <strong>No data found ...</strong>
                              </td>
                            </tr>
                          </ng-container>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <button type="button" class="btn btn-primary">
                                Done
                            </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-modal-add-mfo [mfo]="mfo" />
    <app-modal-add-subtask [subtask]="subtask" />
  `,
})
export class CanvasTargetMfoesComponent implements OnInit {
  ipcrService = inject(IpcrService);
  mfoes = this.ipcrService.dpcr_ipcr();

  @Output() submit = new EventEmitter<any>();
  @Output() setIpcrDataObj = new EventEmitter<any>();
  @Output() hideCanvasIpcrMfoes = new EventEmitter<boolean>();
  @Output() addType = new EventEmitter<any>();
  @Output() handleExpand = new EventEmitter<any>();

  ngOnInit(): void {
    this.ipcrService.ViewGetDPCR_IPCR();
  }

  search: any = '';
  mfo: any = {};
  subtask: any = {};
  quantity: number | any;
  searchMfo: any = '';

  SearchMFO() {
    //   if (this.search === '' || this.search === null) {
    //     this.search = null;
    //   }
    //   if(this.ipcrService.isCommon() >= 0){
    //     this.ipcrService.GetIpcrDataSearchMfoes(this.search);
    //   }else{
    //     this.ipcrService.GetIpcrDataMfoesDivision(this.search);
    //   }
  }

  HideCanvasIpcrMfoes() {
    this.hideCanvasIpcrMfoes.emit(false);
  }

  Submit() {
    this.submit.emit('Submit');
  }

  async SetIpcrDataObj(
    mfoData: any,
    siData: any,
    indexMfo: number,
    indexSI: number
  ) {
    await this.ipcrService.GetIPCRDetailsRemaining(siData.dpcrDataId);

    this.mfo = siData;
    this.mfo.dpcrQuantity = siData.qty;
    this.mfo.quantity = null;
    this.mfo.prompt = false;
    this.mfo.qty_rem = siData.qty;
    this.mfo.isIpcrMfo = mfoData.isIpcrMfo;
    this.mfo.categoryId = mfoData.categoryId ?? mfoData.dpcrCategoryId;

    console.log(this.mfo);
  }

  SetIpcrDataSubtaskObj(st: any, isST: boolean, categoryId: number) {
    this.ipcrService.GetIPCRDetailsRemainingST(st.subTaskId, st.dpcrDataId);

    this.subtask = st;
    this.subtask.dpcrQuantity = st.qty;
    this.subtask.indicator = isST ? st.stIndicator : st.indicator;
    this.subtask.prompt = false;
    this.subtask.qty_rem = st.qty - this.ipcrService.ipcrST_rem();
    this.subtask.quantity = null;
    this.subtask.isIpcrMfo = 0;
    this.subtask.categoryId = categoryId;

    console.log(this.subtask);
  }

  setMFOs(value: number) {
    this.ipcrService.isCommon.set(value);
    this.ipcrService.ViewGetDPCR_IPCR();
    //   if(value == 0 || value == 1){
    //     this.ipcrService.GetIpcrDataMfoes();
    //   }
    //   else{ // get ipcr mfoes
    //     this.ipcrService.GetIpcrDataMfoesDivision(null);
    //   }

    //   this.addType.emit(value);
  }

  displayCatergory(cat: number) {
    let catName = '';
    switch (cat) {
      case 1:
        catName = 'STRATEGIC';
        break;
      case 2:
        catName = 'CORE';
        break;
      case 3:
        catName = 'SUPPORT';
        break;
      default:
        break;
    }

    return catName ? catName + '' : 'NO FUNCTION';
  }

  handleExpandCard() {
    this.handleExpand.emit();
  }
}
