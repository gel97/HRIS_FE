import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-table-dpcr-data-mfoes',
  template: `
    <div class="">
      <div class="col-xl-12">
        <div class="nav-align-top mb-4">
          <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
            <li class="nav-item">
              <button
                (click)="setMFOs(0)"
                type="button"
                class="nav-link"
                [ngClass]="!dpcrService.isCommonDivision() ? 'active':''"
                role="tab"
                data-bs-toggle="tab"
                data-bs-target="#navs-pills-justified-home"
                aria-controls="navs-pills-justified-home"
                aria-selected="false"
              >
                <ng-container>
                  <i class="bx bx-grid-alt"></i> OFFICE MFO
                  <span
                    *ngIf="!dpcrService.isCommonDivision()"
                    class="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger"
                  >
                    {{ dpcrDataMfoes.data.length }}
                  </span>
                </ng-container>
              </button>
            </li>
            <li class="nav-item">
              <button
                (click)="setMFOs(1)"
                type="button"
                class="nav-link"
                [ngClass]="dpcrService.isCommonDivision() ? 'active':''"
                role="tab"
                data-bs-toggle="tab"
                data-bs-target="#navs-pills-justified-profile"
                aria-controls="navs-pills-justified-profile"
                aria-selected="true"
              >
                <ng-container>
                  <i class="bx bx-grid-alt"></i> COMMON MFO
                  <span
                    *ngIf="dpcrService.isCommonDivision()"
                    class="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger"
                  >
                    {{ dpcrDataMfoes.data.length }}
                  </span>
                </ng-container>
              </button>
            </li>
          </ul>
          <div class="input-group">
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
              placeholder="Search MFO ..."
            />
          </div>
          <div class="tab-content px-0 mt-2 pb-0">
            <div
              class="tab-pane fade"
              [ngClass]="!dpcrService.isCommonDivision()?'show active':''"
              id="navs-pills-justified-home"
              role="tabpanel"
            >
              <div class="table-responsive text-nowrap">
                <table class="table table-hover table-striped">
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
                      <tr *ngFor="let b of a.si; let j = index">
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
                        <td [width]="10">
                          <button
                            *ngIf="
                              !dpcrDataMfoes.isSearchLoading &&
                                !dpcrDataMfoes.isLoading;
                              else LoadingBtn
                            "
                            type="button"
                            (click)="SetDpcrDataObj(a,b, i, j)"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDpcrData"
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
            </div>
            <div
              class="tab-pane fade"
              [ngClass]="dpcrService.isCommonDivision()?'show active':''"
              id="navs-pills-justified-profile"
              role="tabpanel"
            >
              <div class="table-responsive text-nowrap">
                <table class="table table-hover table-striped">
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
                      <tr *ngFor="let b of a.si; let j = index">
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
                        <td [width]="10">
                          <button
                            *ngIf="
                              !dpcrDataMfoes.isSearchLoading &&
                                !dpcrDataMfoes.isLoading;
                              else LoadingBtn
                            "
                            type="button"
                            (click)="SetDpcrDataObj(a,b,i,j)"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDpcrData"
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
            </div>
          </div>
        </div>
        <!-- <button type="button" class="btn btn-primary">
                                Done
                            </button> -->
      </div>
    </div>
  `,
})
export class TableDpcrDataMfoesComponent {
  dpcrService = inject(DpcrService);

  @Input() dpcrDataMfoes: any;

  @Output() setDpcrDataObj = new EventEmitter<any>();

  search: any = '';

  SearchMFO() {
    if (this.search === '' || this.search === null) {
      this.search = null;
    }
    this.dpcrService.GetDpcrDataSearchMfoes(this.search);
  }

  SetDpcrDataObj(mfoData:any,siData:any, indexMfo:number, indexSI:number){
    siData.indexMfo = indexMfo;
    siData.indexSI = indexSI;

    this.setDpcrDataObj.emit({mfoData,siData});
  }

  setMFOs(value: number) {
    this.dpcrService.isCommonDivision.set(value);
    this.dpcrService.GetDpcrDataMfoes();
  }

  categoryName(cat: number) {
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

    return catName ? catName + ' FUNCTION' : 'NO FUNCTION';
  }
}
