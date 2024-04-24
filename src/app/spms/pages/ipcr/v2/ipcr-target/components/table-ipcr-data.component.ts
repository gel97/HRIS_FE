import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { OpcrService } from 'src/app/spms/service/opcr.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-table-ipcr-data',
  template: `
    <ng-container *ngIf="!mfoes.isLoading; else LoadingView">
      <button
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasIpcrMfoes"
        aria-controls="offcanvasScroll"
        type="button"
        class="btn btn-primary mt-2"
        *ngIf="mfoes.data.length > 0; else showNoData"
        (click)="handleExpandCard()"
        
      >
      <i class="bx bx-plus"></i>
        MAJOR FINAL OUTPUT
      </button>
      <div [ngClass]="isExpand? 'col-xl-6':'col-xl-12'">
        <div cdkDropList (cdkDropListDropped)="drop($event)">
          <div class="card my-2" *ngFor="let a of mfoes.data; let i = index" cdkDrag>
            <div class="card-header x-space-between">
              <div>
                <b class="text-primary">{{ i + 1 }}. {{ a.mfo }}</b>
              </div>
              <div>
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
                <ul
                  *ngIf="!a.isIpcrMfo"
                  class="dropdown-menu dropdown-menu-end pointer"
                >
                  <li *ngIf="a.categoryId !== 1">
                    <a
                      (click)="
                        PutMFOFromIpcrCategory(a.si[0].ipcrId, a.mfoId, 1);
                        a.categoryId = 1
                      "
                      class="dropdown-item"
                      >STRATEGIC</a
                    >
                  </li>
                  <li *ngIf="a.categoryId !== 2">
                    <a
                      (click)="
                        PutMFOFromIpcrCategory(a.si[0].ipcrId, a.mfoId, 2);
                        a.categoryId = 2
                      "
                      class="dropdown-item"
                      >CORE
                    </a>
                  </li>
                  <li *ngIf="a.categoryId !== 3">
                    <a
                      (click)="
                        PutMFOFromIpcrCategory(a.si[0].ipcrId, a.mfoId, 3);
                        a.categoryId = 3
                      "
                      class="dropdown-item"
                      >SUPPORT
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <ng-container *ngFor="let b of a.si; let y = index">
                <div
                  *ngIf="b.isSubTask === 0; else showSubtask"
                  class="accordion"
                  id="accordionExample"
                >
                  <div class="card accordion-item">
                    <h2
                      class="accordion-header"
                      id="heading{{ i }}"
                      style="margin-right: 10px;"
                    >
                      <button
                        type="button"
                        class="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        [attr.data-bs-target]="'#accordion' + i"
                        aria-expanded="false"
                        [attr.aria-controls]="'accordion' + i"
                      >
                        <i class="bx bx-label"></i>
                        &nbsp;
                        <strong class="text-success">
                          <u> {{ b.qty }}{{ b.qtyUnit ? '%' : '' }} </u>
                        </strong>
                        &nbsp;
                        {{ b.indicator }}
                      </button>
                      <div
                        class="dropdown"
                        style="position: absolute; right: 0px; top: 20px; z-index: 3;"
                      >
                        <button
                          type="button"
                          class="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            class="bx bx-dots-vertical-rounded text-primary"
                            style="position: absolute; right: 0px; top: 0px; z-index: 3;"
                          ></i>
                        </button>
                        <div class="dropdown-menu">
                          <a
                            class="dropdown-item cursor-pointer"
                            (click)="EditIPCRDetails(a,b)"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEdit"
                            ><i class="bx bx-edit-alt me-1"></i> Edit</a
                          >
                          <a class="dropdown-item cursor-pointer"
                            (click)="DeleteIPCRDetails(b.ipcrDataId)"
                            ><i class="bx bx-trash me-1"></i> Delete</a
                          >
                        </div>
                      </div>
                    </h2>
                    <div
                      id="accordion{{ i }}"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div class="table-responsive text-nowrap">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th>RATING</th>
                                <th>QUANTITY</th>
                                <th>QUALITY</th>
                                <th>TIMELINESS</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{{ '5' }}</td>
                                <td>{{ b.qty5 }}</td>
                                <td>{{ b.qlty5 }}</td>
                                <td>{{ b.timely5 }}</td>
                              </tr>
                              <tr>
                                <td>{{ '4' }}</td>
                                <td>{{ b.qty4 }}</td>
                                <td>{{ b.qlty4 }}</td>
                                <td>{{ b.timely4 }}</td>
                              </tr>
                              <tr>
                                <td>{{ '3' }}</td>
                                <td>{{ b.qty3 }}</td>
                                <td>{{ b.qlty3 }}</td>
                                <td>{{ b.timely3 }}</td>
                              </tr>
                              <tr>
                                <td>{{ '2' }}</td>
                                <td>{{ b.qty2 }}</td>
                                <td>{{ b.qlty2 }}</td>
                                <td>{{ b.timely2 }}</td>
                              </tr>
                              <tr>
                                <td>{{ '1' }}</td>
                                <td>{{ b.qty1 }}</td>
                                <td>{{ b.qlty1 }}</td>
                                <td>{{ b.timely1 }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ng-template #showSubtask>
                  <ng-container *ngFor="let c of b.st; let z = index">          
                    <div class="x-space-between m-2 ">
                      <div>
                        <b class="text-secondary"
                          >{{ i + 1 }}.{{ z + 1 }}. {{ c.stMfo }}</b
                        >
                      </div>
                      <div>
                        <small
                          class="badge rounded-pill"
                          style="background-color: black;"
                        >
                          SUBTASK MFO
                        </small>
                      </div>
                    </div>
                    <div class="accordion" id="accordionExampleST">
                      <div class="card accordion-item">
                        <h2
                          class="accordion-header"
                          id="headingST{{ z }}"
                          style="margin-right: 10px;"
                        >
                          <button
                            type="button"
                            class="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            [attr.data-bs-target]="'#accordionST' + z"
                            aria-expanded="false"
                            [attr.aria-controls]="'accordionST' + z"
                          >
                            <i class="bx bx-label"></i>
                            &nbsp;
                            <strong class="text-success">
                              <u> {{ c.qty }}{{ c.qtyUnit ? '%' : '' }} </u>
                            </strong>
                            &nbsp;
                            {{ c.stIndicator }}
                          </button>
                          <div
                            class="dropdown"
                            style="position: absolute; right: 0px; top: 20px; z-index: 3;"
                          >
                            <button
                              type="button"
                              class="btn p-0 dropdown-toggle hide-arrow"
                              data-bs-toggle="dropdown"
                            >
                              <i
                                class="bx bx-dots-vertical-rounded text-primary"
                                style="position: absolute; right: 0px; top: 0px; z-index: 3;"
                              ></i>
                            </button>
                            <div class="dropdown-menu">
                              <a
                                class="dropdown-item cursor-pointer"
                                (click)="EditIPCRSubtaskDetails(c)"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditSubtask"
                                ><i class="bx bx-edit-alt me-1"></i> Edit</a
                              >
                              <a class="dropdown-item cursor-pointer" (click)="DeleteIPCRSTDetails(c.ipcrSubtaskId)"
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                          </div>
                        </h2>
                        <div
                          id="accordionST{{ z }}"
                          class="accordion-collapse collapse"
                          data-bs-parent="#accordionExampleST"
                        >
                          <div class="accordion-body">
                            <div class="table-responsive text-nowrap">
                              <table class="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>RATING</th>
                                    <th>QUANTITY</th>
                                    <th>QUALITY</th>
                                    <th>TIMELINESS</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{{ '5' }}</td>
                                    <td>{{ c.qty5 }}</td>
                                    <td>{{ c.qlty5 }}</td>
                                    <td>{{ c.timely5 }}</td>
                                  </tr>
                                  <tr>
                                    <td>{{ '4' }}</td>
                                    <td>{{ c.qty4 }}</td>
                                    <td>{{ c.qlty4 }}</td>
                                    <td>{{ c.timely4 }}</td>
                                  </tr>
                                  <tr>
                                    <td>{{ '3' }}</td>
                                    <td>{{ c.qty3 }}</td>
                                    <td>{{ c.qlty3 }}</td>
                                    <td>{{ c.timely3 }}</td>
                                  </tr>
                                  <tr>
                                    <td>{{ '2' }}</td>
                                    <td>{{ c.qty2 }}</td>
                                    <td>{{ c.qlty2 }}</td>
                                    <td>{{ c.timely2 }}</td>
                                  </tr>
                                  <tr>
                                    <td>{{ '1' }}</td>
                                    <td>{{ c.qty1 }}</td>
                                    <td>{{ c.qlty1 }}</td>
                                    <td>{{ c.timely1 }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>               
                  </ng-container>
                </ng-template>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
      <ng-template #showNoData>
        <img
          src="assets/img/document.png"
          alt=""
          width="200"
          height="200"
          style="display: block; margin: 0 auto; margin-top: 20px"
        />
        <span
          style="
                                          display: flex;
                                          flex-direction: column;
                                          justify-content: space-between;
                                          align-items: center;
                                          height: 100%;
                                              "
        >
          <div>
            <label style="margin-bottom: 10px;"
              ><strong>No Data Found!</strong></label
            >
          </div>
          <div>
            <button
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasIpcrMfoes"
              aria-controls="offcanvasScroll"
              type="button"
              class="btn btn-primary"
            >
            <i class="bx bx-plus"></i>
              MAJOR FINAL OUTPUT
            </button>
          </div>
        </span>
      </ng-template>
    </ng-container>
    <ng-template #LoadingView>
      <app-skeleton-loading/>
    </ng-template>
    <app-modal-edit-mfo [mfo]="mfo"/>
    <app-modal-edit-subtask [subtask]="subtask"/>
  `,

  styleUrls: ['../ipcr-target.component.css'],
  animations: [
    trigger('rowState', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('0.5s', style({ opacity: 1 }))]),
      transition(':leave', [animate('0.1s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class TableIpcrDataComponent implements OnInit {
  dpcrService = inject(DpcrService);
  opcrService = inject(OpcrService);
  ipcrService = inject(IpcrService);

  mfoes = this.ipcrService.ipcrDetails();

  mfo     : any = {};
  subtask : any = {};

  @Output() handleExpand = new EventEmitter<any>();
  @Input() isExpand:any;

  ngOnInit(): void {
    this.ipcrService.GetIPCRDetails();
  }

  drop(event: any) {
    console.log(event);

    moveItemInArray(
      this.mfoes.data,
      event.previousIndex,
      event.currentIndex
    );

    console.log(event)
    let sortData: any = [];

    this.mfoes.data.forEach((x: any, index: number) => {
      x.si.forEach((y: any) => {
        const exists = sortData.some((a: any) => a.ipcrDataId === y.ipcrDataId);
        if (!exists) {
          sortData.push({ ipcrDataId: y.ipcrDataId, index: index });
        }
      });
    });
    this.ipcrService.PutIpcrDataSortByMfo(sortData);
    console.log(sortData);
  }

  EditIPCRDetails(a:any, b:any){
    this.ipcrService.GetIPCRDetailsRemaining(b.dpcrDataId);
    this.mfo            = b;
    this.mfo.sortByMFO  = a.sortByMFO;
    this.mfo.isIpcrMfo  = a.isIpcrMfo;
    this.mfo.returnQty  = b.qty;
    this.mfo.promptEdit = false;
  }

  EditIPCRSubtaskDetails(c:any){
   // GetIPCRDetailsRemainingST(ipcrSTDetails.subTaskId); returnQtyST = ipcrSTDetails.qty; promptEditST = false"
    this.mfo.add_qtyRemainingST = this.mfo.dpcrSTQuantity - this.ipcrService.ipcrST_rem();
    this.ipcrService.GetIPCRDetailsRemainingST(c.subTaskId);   
    this.subtask              = c;
    this.subtask.returnQtyST  = c.qty;
    this.subtask.promptEditST = false;
  }

  DeleteIPCRDetails(value: any) {
    this.ipcrService.DeleteIPCRDetails(value);
  }

  DeleteIPCRSTDetails(value: any) {
    this.ipcrService.DeleteIPCRSTDetails(value);
  }

  handleExpandCard(){
    this.handleExpand.emit();
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

  PutMFOFromIpcrCategory(ipcrId: string, MFOId: string, categoryId: number) {
    this.ipcrService.EditIpcrDataMfoCategory(ipcrId, MFOId, categoryId);
  }
}
