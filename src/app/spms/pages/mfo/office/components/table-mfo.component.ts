import { Component, EventEmitter, Output, Input, inject  } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MfoService } from 'src/app/spms/service/mfo.service';
@Component({
  selector: 'app-table-mfo',
  template: `
    <div class="table-responsive text-nowrap w-100">
      <table class="table table-hover mt-5 ">
        <thead>
          <tr>
            <td [width]="10"></td>
            <th [width]="10">#</th>
            <th>MFO</th>
            <th
              [width]="10"
              *ngIf="
                !mfoService.isCommon() ||
                (mfoService.isCommon() && hrFocal === officeId)
              "
            >
              Actions
            </th>
          </tr>
        </thead>
        <ng-container *ngIf="mfo.isLoading && mfo.data.length === 0">
          <tbody>
            <tr>
              <td colspan="4" class="text-center">
                <app-spinner></app-spinner>
              </td>
            </tr>
          </tbody>
        </ng-container>
        <tbody class="table-border-bottom-0">
          <ng-container *ngFor="let a of mfo.data; let i = index">
            <tr
              [ngClass]="a.si.length === 0 ? 'bg-custom-gray' : ''"
              [@rowState]="a"
            >
              <td
                style="max-width: 5px;"
                (click)="
                  expandedRow == i ? (expandedRow = null) : (expandedRow = i)
                "
              >
                <i
                  *ngIf="!mfo.isLoading; else LoadingIcon"
                  class="bx bx-chevron-right cursor-pointer"
                ></i>
                <ng-template #LoadingIcon>
                  <ngx-skeleton-loader
                    count="1"
                    animation="pulse"
                    appearance="line"
                    [theme]="{ margin: '0px' }"
                  ></ngx-skeleton-loader>
                </ng-template>
              </td>
              <td
                style="max-width: 5px;"
                class="cursor-pointer"
                (click)="
                  expandedRow == i ? (expandedRow = null) : (expandedRow = i)
                "
              >
                <div *ngIf="!mfo.isLoading; else LoadingIndex">
                  {{ i + 1 }}
                </div>
                <ng-template #LoadingIndex>
                  <ngx-skeleton-loader
                    count="1"
                    animation="pulse"
                    appearance="line"
                    [theme]="{ margin: '0px' }"
                  ></ngx-skeleton-loader>
                </ng-template>
              </td>
              <td
                style="max-width: 800px;min-width: 800px;"
                class="cursor-pointer"
                (click)="
                  expandedRow == i ? (expandedRow = null) : (expandedRow = i)
                "
              >
                <div *ngIf="!mfo.isLoading; else LoadingMfo">
                  <div class="x-space-between">
                    <div>{{ a.mfo }}</div>
                    <div class="x-space-between">
                      <div *ngIf="a.si.length === 0">
                        <button
                          *ngIf="
                            !mfoService.isCommon() ||
                            (mfoService.isCommon() && hrFocal === officeId)
                          "
                          (click)="SetMfoData(a); ClearSIData(); IsAdd(true)"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasSI"
                          class="btn btn-primary"
                        >
                          Create success indicator
                        </button>
                      </div>
                       <small
                        *ngIf="mfoService.isCommon()"
                        class="badge rounded-pill float-end"
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
                      <ul class="dropdown-menu dropdown-menu-end pointer">
                        <li *ngIf="a.categoryId !== 1">
                          <a
                            (click)="
                              PutCMFOCategory(a.mfoId, 1); a.categoryId = 1
                            "
                            class="dropdown-item"
                            >STRATEGIC</a
                          >
                        </li>
                        <li *ngIf="a.categoryId !== 2">
                          <a
                            (click)="
                              PutCMFOCategory(a.mfoId, 2); a.categoryId = 2
                            "
                            class="dropdown-item"
                            >CORE
                          </a>
                        </li>
                        <li *ngIf="a.categoryId !== 3">
                          <a
                            (click)="
                              PutCMFOCategory(a.mfoId, 3); a.categoryId = 3
                            "
                            class="dropdown-item"
                            >SUPPORT
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
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
              <td
                *ngIf="
                  !mfoService.isCommon() ||
                  (mfoService.isCommon() && hrFocal === officeId)
                "
              >
                <div
                  class="dropdown position-static"
                  *ngIf="!mfo.isLoading; else LoadingActions"
                >
                  <button
                    type="button"
                    class="btn p-0 dropdown-toggle hide-arrow"
                    data-bs-toggle="dropdown"
                  >
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu">
                    <a
                      class="dropdown-item cursor-pointer"
                      (click)="SetMfoData(a); ClearSIData(); IsAdd(true)"
                      data-bs-toggle="tooltip"
                      matTooltip="Success Indicator"
                      matTooltipPosition="left"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasSI"
                      aria-controls="offcanvasSI"
                      ><i class="bx bx-plus me-1"></i> Create</a
                    >
                    <a
                      class="dropdown-item cursor-pointer"
                      (click)="SetMfoData(a); IsAdd(false)"
                      data-bs-toggle="tooltip"
                      matTooltip="MFO"
                      matTooltipPosition="left"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasScroll"
                      aria-controls="offcanvasScroll"
                      ><i class="bx bx-edit-alt me-1"></i> Edit</a
                    >
                    <a
                      class="dropdown-item cursor-pointer"
                      (click)="DeleteMFO(a.mfoId)"
                      ><i class="bx bx-trash me-1"></i> Delete</a
                    >
                  </div>
                </div>
                <ng-template #LoadingActions>
                  <ngx-skeleton-loader
                    count="1"
                    animation="pulse"
                    appearance="circle"
                    [theme]="{ margin: '0px' }"
                  ></ngx-skeleton-loader>
                </ng-template>
              </td>
            </tr>
            <ng-container *ngIf="expandedRow == i">
              <tr *ngFor="let b of a.si; let y = index" class="bg-lightest">
                <td colspan="4" class="p-custom bg-lightest">
                  <div>
                    <div class="row justify-content-between w-100 mb-2">
                      <div
                        class="col-6 cursor-pointer"
                        (click)="
                          expandedRowChild == y
                            ? (expandedRowChild = null)
                            : (expandedRowChild = y)
                        "
                      >
                        <div class="form-text text-gray">
                          <i class="bx bx-chevron-right"></i>
                          {{ b.indicator }}
                        </div>
                      </div>
                      <div
                        class="col-6"
                        *ngIf="
                          !mfoService.isCommon() ||
                          (mfoService.isCommon() && hrFocal === officeId)
                        "
                      >
                        <div class="float-end">
                          <button
                            (click)="SetSIData(a, b); IsAdd(false)"
                            class="btn btn-secondary"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasSI"
                            aria-controls="offcanvasSI"
                          >
                            <i class="bx bx-edit-alt"></i> EDIT
                          </button>
                          &nbsp;
                          <button
                            (click)="DeleteSI(b.indicatorId)"
                            class="btn btn-danger"
                          >
                            <i class="bx bx-trash text-white"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <ng-container *ngIf="expandedRowChild == y">
                      <!-- Bordered Table -->
                      <div class="card">
                        <div class="card-body">
                          <div class="table-responsive text-nowrap">
                            <table class="table table-bordered ">
                              <thead>
                                <th [width]="1">Rating</th>
                                <th class="text-center">Quality</th>
                                <th class="text-center">Timeliness</th>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>5</td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.qlty5
                                    }}</span>
                                  </td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.timely5
                                    }}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>4</td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.qlty4
                                    }}</span>
                                  </td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.timely4
                                    }}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>3</td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.qlty3
                                    }}</span>
                                  </td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.timely3
                                    }}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.qlty2
                                    }}</span>
                                  </td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.timely2
                                    }}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>1</td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.qlty1
                                    }}</span>
                                  </td>
                                  <td>
                                    <span *ngIf="b.standard">{{
                                      b.standard.timely1
                                    }}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </ng-container>
                  </div>
                </td>
              </tr>
            </ng-container>
          </ng-container>
        </tbody>
        <ng-container *ngIf="!mfo.isLoading && mfo.data.length == 0">
          <tbody>
            <tr>
              <td colspan="4" class="text-center">
                <p>No data . . .</p>
              </td>
            </tr>
          </tbody>
        </ng-container>
      </table>
    </div>
  `,
  animations: [
    trigger('rowState', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('0.5s', style({ opacity: 1 }))]),
      transition(':leave', [animate('0.1s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class TableMfoComponent {
  mfoService = inject(MfoService);
  @Input() mfo: any;

  @Output() setIsCommon = new EventEmitter<any>();
  @Output() setMfoData = new EventEmitter<any>();
  @Output() setSIData = new EventEmitter<any>();

  @Output() deleteMfo = new EventEmitter<string>();
  @Output() deleteSI = new EventEmitter<string>();

  @Output() isAdd = new EventEmitter<boolean>();

  @Output() clearSIData = new EventEmitter<any>();

  hrFocal: string = 'OFFPHRMONZ3WT7D';
  officeId = localStorage.getItem('officeId');
  isCommon = this.mfoService.isCommon();
  expandedRow: any;

  expandedRowChild: any;

  SetMfoData(item: any) {
    this.setMfoData.emit(item);
  }

  SetSIData(mfo: any, si: any) {
    this.setSIData.emit({ mfo, si });
  }

  DeleteSI(indicatorId: string) {
    this.deleteSI.emit(indicatorId);
  }

  DeleteMFO(MfoId: string) {
    this.deleteMfo.emit(MfoId);
  }

  IsAdd(value: boolean) {
    this.isAdd.emit(value);
  }

  ClearSIData() {
    this.clearSIData.emit('Clear SI data');
  }

  PutCMFOCategory( MFOId: string, categoryId: number) {
    this.mfoService.EditMfoCategory(MFOId,categoryId);
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
}