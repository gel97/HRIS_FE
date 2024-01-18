import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { OpcrService } from 'src/app/spms/service/opcr.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-table-dpcr-data',
  template: `
    <div class="card">
      <div class="row">
        <div class="col-10">
          <h3 class="card-header">
            <strong class="txt-custom-light-violet">{{dpcrService.divisionName}} MFO</strong>
          </h3>
        </div>
        <div class="col-2">
          <button
            *ngIf="!isShowCanvasOpcrMfoes"
            (click)="IsShowCanvasOpcrMfoes()"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDpcrMfoes"
            class="btn btn-primary m-2 float-end"
          >
            OPCR MFO
          </button>
        </div>
      </div>
      <div class="table-responsive text-nowrap">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>MFO</th>
              <th [width]="10">Actions</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <ng-container *ngFor="let a of dpcrData.data; let i = index">
              <tr class="cursor-pointer" [@rowState]="a">
                <td colspan="2" *ngIf="!dpcrData.isLoading; else LoadingMfo">
                  <div class="row">
                    <div class="col-9">
                      <strong class="text-primary"
                        >{{ i + 1 }}. {{ a.mfo }}</strong
                      >
                    </div>
                    <div class="col-3">
                      <small
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
                      <ul *ngIf="a.si[0].isDpcrMfo" class="dropdown-menu dropdown-menu-end pointer">
                        <li>
                          <a
                            (click)="
                              PutMFOCategory(a.mfoId, 1); a.categoryId = 1
                            "
                            class="dropdown-item"
                            >STRATEGIC</a
                          >
                        </li>
                        <li>
                          <a
                            (click)="
                              PutMFOCategory(a.mfoId, 2); a.categoryId = 2
                            "
                            class="dropdown-item"
                            >CORE
                          </a>
                        </li>
                        <li>
                          <a
                            (click)="
                              PutMFOCategory(a.mfoId, 3); a.categoryId = 3
                            "
                            class="dropdown-item"
                            >SUPPORT
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
                <ng-template #LoadingMfo>
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      animation="pulse"
                      appearance="line"
                      [theme]="{ margin: '0px' }"
                    ></ngx-skeleton-loader>
                  </td>
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      animation="pulse"
                      appearance="line"
                      [theme]="{ margin: '0px' }"
                    ></ngx-skeleton-loader>
                  </td>
                </ng-template>
              </tr>
              <ng-container *ngFor="let b of a.si; let y = index">
                <tr
                  *ngIf="!dpcrData.isLoading; else LoadingIndicator"
                  class="cursor-pointer"
                >
                  <td (click)="setIndex(i, y)">
                    <i class="bx bx-chevron-right"></i
                    ><strong
                      ><u>{{ b.qty }}{{b.qtyUnit ? '%': ''}}</u></strong
                    >&nbsp;{{ b.indicator }} &nbsp;
                    <small
                      *ngIf="b.subtaskCount > 0 || b.subtaskCountCmfo"
                      class="badge rounded-pill float-end bg-label-info"
                      aria-expanded="false"
                    >
                      subtask
                      <span
                        class="badge rounded-pill badge-center h-px-20 w-px-20 bg-info"
                      >
                        {{ b.subtaskCount + b.subtaskCountCmfo }}
                      </span>
                    </small>
                    &nbsp;
                  </td>
                  <td>
                    <div class="dropdown position-static">
                      <button
                        type="button"
                        class="btn p-0 dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                      >
                        <i class="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div class="dropdown-menu">
                        <a
                          (click)="SetDataSubTask(a, b, i, y)"
                          class="dropdown-item cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDpcrDataEditQuantity"
                          ><i class="bx bx-edit-alt me-1"></i> Target</a
                        >
                        <a
                          class="dropdown-item cursor-pointer"
                          (click)="SetDataSubTask(a, b, i, y)"
                          data-bs-toggle="modal"
                          data-bs-target="#modalSubTask"
                          ><i class="bx bx-list-plus"></i> Sub-Task</a
                        >

                        <!-- <a
                          class="dropdown-item cursor-pointer"
                          (click)="SetDataSubTask(a, b); IsShowSubtask()"
                          ><i class="bx bx-list-plus"></i> View Sub-Task</a
                        > -->

                        <a
                          class="dropdown-item cursor-pointer"
                          (click)="DeleteDpcrDataIndicator(b.dpcrDataId)"
                          ><i class="bx bx-trash me-1"></i> Delete</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <ng-template #LoadingIndicator>
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      animation="pulse"
                      appearance="line"
                      [theme]="{ margin: '0px' }"
                    ></ngx-skeleton-loader>
                  </td>
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      animation="pulse"
                      appearance="circle"
                      [theme]="{ margin: '0px' }"
                    ></ngx-skeleton-loader>
                  </td>
                </ng-template>
                <ng-container
                  *ngIf="currentSiIndex === y && currentMfoIndex === i"
                >
                  <ng-container *ngFor="let c of b.st">
                    <tr class="bg-info text-white" [@rowState]="c">
                      <td>
                        <i class="m-2 bx bx-radio-circle"></i>{{ c.stMfo }}
                      </td>
                      <td></td>
                    </tr>
                    <tr class="bg-label-info" [@rowState]="c">
                      <td>
                        &nbsp; <i class="m-2 bx bx-subdirectory-right"></i
                        ><strong
                          ><u>{{ c.qty }}</u></strong
                        >
                        {{ c.stIndicator }}
                      </td>
                      <td>
                        <div class="dropdown position-static">
                          <button
                            type="button"
                            class="btn p-0 dropdown-toggle hide-arrow "
                            data-bs-toggle="dropdown"
                          >
                            <i
                              class="bx bx-dots-vertical-rounded text-label"
                            ></i>
                          </button>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item cursor-pointer"
                              data-bs-toggle="modal"
                              data-bs-target="#modalEditSubTask"
                              (click)="subtaskData = c"
                            >
                              <i
                                class="bx bxs-edit text-label cursor-pointer"
                              ></i>
                              Edit Sub-Task
                            </a>
                            <a
                              class="dropdown-item cursor-pointer"
                              (click)="DeleteSubtask(c.subTaskId)"
                              ><i class="bx bx-trash me-1"></i> Delete</a
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                  </ng-container>
                  <ng-container *ngFor="let d of b.stCmfo">
                    <tr class="bg-info text-white" [@rowState]="d">
                      <td>
                        <i class="m-2 bx bx-radio-circle"></i>{{ d.mfo }}
                        <label
                          class="btn rounded-pill btn-outline-info text-white border-white float-end"
                          for="btnradio1"
                        >
                          Common MFO
                        </label>
                      </td>
                      <td></td>
                      <!-- <td><i data-bs-toggle="modal"
                    data-bs-target="#modalEditSubTask"
                    (click)="subtaskData = c" class="bx bxs-edit text-white cursor-pointer"></i></td>
                     -->
                    </tr>
                    <ng-container *ngFor="let e of d.si">
                      <tr class="bg-label-info" [@rowState]="e">
                        <td>
                          &nbsp; <i class="m-2 bx bx-subdirectory-right"></i
                          ><strong
                            ><u>{{ e.qty }}</u></strong
                          >
                          {{ e.indicator }}
                        </td>
                        <td>
                          <!-- <i
                            data-bs-toggle="modal"
                            data-bs-target="#modalEditSubTaskCmfo"
                            (click)="subtaskData = e; subtaskData.mfo = d.mfo; subtaskData.indicator = e.indicator; "
                            class="bx bxs-edit text-label cursor-pointer"
                          ></i> -->
                          <div class="dropdown position-static">
                            <button
                              type="button"
                              class="btn p-0 dropdown-toggle hide-arrow "
                              data-bs-toggle="dropdown"
                            >
                              <i
                                class="bx bx-dots-vertical-rounded text-label"
                              ></i>
                            </button>
                            <div class="dropdown-menu">
                              <a
                                class="dropdown-item cursor-pointer"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditSubTaskCmfo"
                                (click)="
                                  subtaskData = e;
                                  subtaskData.mfo = d.mfo;
                                  subtaskData.indicator = e.indicator
                                "
                              >
                                <i
                                  class="bx bxs-edit text-label cursor-pointer"
                                ></i>
                                Edit Sub-Task
                              </a>
                              <a
                                class="dropdown-item cursor-pointer"
                                (click)="DeleteSubtask(e.indicatorId)"
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                          </div>
                        </td>
                      </tr>
                    </ng-container>
                  </ng-container>
                </ng-container>
              </ng-container>
            </ng-container>
          </tbody>
        </table>
      </div>
    </div>
    <app-modal-edit-sub-task [data]="subtaskData" />
    <app-modal-edit-sub-task-cmfo [data]="subtaskData" />
  `,
  // animations: [
  //   trigger('rowState', [
  //     state('void', style({ opacity: 0, transform: 'translateX(-100%)' })),
  //     transition(':enter', [
  //       animate('0.5s', style({ opacity: 1, transform: 'translateX(0)' }))
  //     ]),
  //     transition(':leave', [
  //       animate('0.5s', style({ opacity: 0, transform: 'translateX(-100%)' }))
  //     ])
  //   ])
  // ]
  animations: [
    trigger('rowState', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('0.5s', style({ opacity: 1 }))]),
      transition(':leave', [animate('0.1s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class TableDpcrDataComponent {
  dpcrService = inject(DpcrService);
  opcrService = inject(OpcrService);

  @Input() dpcrData: any;
  @Input() isShowCanvasOpcrMfoes: any;

  @Output() isShowSubtask = new EventEmitter<boolean>();
  @Output() setDpcr = new EventEmitter<any>();
  @Output() deleteDpcrDataIndicator = new EventEmitter<string>();
  @Output() deleteSubtask = new EventEmitter<string>();
  @Output() setDataSubTask = new EventEmitter<any>();
  @Output() showCanvasOpcrMfoes = new EventEmitter<boolean>();

  currentMfoIndex: any;
  currentSiIndex: any;
  subtaskData: any = {};

  DeleteDpcrDataIndicator(dpcrDataId: string) {
    this.deleteDpcrDataIndicator.emit(dpcrDataId);
  }

  DeleteSubtask(id: string) {
    this.deleteSubtask.emit(id);
  }

  SetDataSubTask(mfoData: any, siData: any, indexMfo: number, indexSI: number) {
    siData.indexMfo = indexMfo;
    siData.indexSI = indexSI;
    siData.qtyRemaining = siData.qtyOpcr - siData.qtyCommitted;

    this.setDataSubTask.emit({ mfoData, siData });
  }

  SetDpcr(item: any) {
    this.setDpcr.emit(item);
  }

  IsShowSubtask() {
    this.isShowSubtask.emit(true);
  }

  IsShowCanvasOpcrMfoes() {
    this.showCanvasOpcrMfoes.emit(true);
  }

  testData() {
  }

  setIndex(i: number, y: number) {
    if (this.currentSiIndex === y && this.currentMfoIndex === i) {
      this.currentSiIndex = null;
      this.currentMfoIndex = null;
    } else {
      this.currentSiIndex = y;
      this.currentMfoIndex = i;
    }
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

  PutMFOCategory(mfoId: string, categoryId: number) {
    this.opcrService.PutMFOCategory(mfoId, categoryId);
  }
}
