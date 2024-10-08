import { Component, OnInit, inject } from '@angular/core';
import { OpcrService } from 'src/app/spms/service/opcr.service';
@Component({
  selector: 'app-view-opcr-actual-data',
  template: `
    <app-loading [loading]="opcrDataActual.isLoading"/>
    <div class="row">
      <div *ngFor="let a of opcrDataActual.rating; let i = index" class="col-3">
        <div
          class="card text-white mb-3"
          [ngClass]="{
            'gradient-warning': a.categoryId === 3,
            'gradient-primary': a.categoryId === 2,
            'gradient-success': a.categoryId === 1
          }"
        >
          <div class="card-header">
            <div class="row">
              <div class="col-3">
                <img
                  [src]="getImageSource(a.categoryId)"
                  alt=""
                  width="50"
                  height="50"
                />
              </div>
              <div class="col-9">
                <h2 class="text-white mt-2">{{ a.category }}</h2>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between ">
              <div class="row">
                <div class="col-12 text-center fs-2 fw-bold">
                  {{ a.countSI }}
                </div>
                <div class="col-12 text-center mt-1">Total</div>
              </div>
              <div class="row">
                <div class="col-12 text-center fs-2 fw-bold">
                  {{ a.aveByCat }}
                </div>
                <div class="col-12 text-center mt-1">Average</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div *ngIf="opcrDataActual.finalRating.total >= 1" class="col-12">
        <div>
          <div class="col-12">
            <div class="card h-100">
              <div class="d-inline-flex">
                <img
                  [src]="getUserImageSource()"
                  class="img-fluid"
                  alt="Image"
                  width="80"
                  height="80"
                  style="margin-left: 12px;"
                  data-app-light-img="illustrations/sitting-girl-with-laptop-light.png"
                  data-app-dark-img="illustrations/sitting-girl-with-laptop-dark.png"
                />
                <div
                  [ngSwitch]="opcrDataActual.finalRating.adjectivalRating"
                  class="mt-4 px-4"
                >
                  <p *ngSwitchCase="'Poor'">
                    Hi, <b>{{ opcrService.officeName ?? '' }}</b
                    >! Your current rating is
                    <u class="text-danger fs-6 fw-bold">{{
                      opcrDataActual.finalRating.total
                    }}</u
                    >, which is equivalent to adjectival rating of
                    <span class="badge rounded-pill bg-label-danger">Poor</span
                    >.
                  </p>
                  <p *ngSwitchCase="'Unsatisfactory'">
                    Hello, {{ opcrService.officeName ?? '' }}! Unfortunately,
                    your rating is only
                    <u class="text-danger fs-6 fw-bold">{{
                      opcrDataActual.finalRating.total
                    }}</u
                    >, which results to
                    <span class="badge rounded-pill bg-label-danger"
                      >unsatisfactory</span
                    >
                    rating. Keep on improving your performance.
                  </p>
                  <p *ngSwitchCase="'Satisfactory'">
                    Good job, {{ opcrService.officeName ?? '' }}! You have a
                    <span class="badge rounded-pill bg-label-primary"
                      >satistfactory</span
                    >
                    performance with a rating of
                    <u class="text-primary fs-6 fw-bold">{{
                      opcrDataActual.finalRating.total
                    }}</u
                    >.
                  </p>
                  <p *ngSwitchCase="'Very Satisfactory'">
                    Congratulations,
                    {{ opcrService.officeName ?? '' }}! You were able to
                    achieved a
                    <span class="badge rounded-pill bg-label-success"
                      >very satistfactory</span
                    >
                    performance with a rating of
                    <u class="text-success fs-6 fw-bold">{{
                      opcrDataActual.finalRating.total
                    }}</u
                    >.
                  </p>
                  <p *ngSwitchCase="'Outstanding'">
                    Well done, {{ opcrService.officeName ?? '' }}! You did an
                    <span class="badge rounded-pill bg-label-success"
                      >Outstanding</span
                    >
                    performance for a rating of
                    <u class="text-success fs-6 fw-bold">{{
                      opcrDataActual.finalRating.total
                    }}</u
                    >.
                  </p>
                  <p *ngSwitchDefault>Default Content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ng-container *ngFor="let a of opcrDataActual.data; let i = index">
      <div class="card my-2 ">
        <div class="card-header">
          <div class="row">
            <div class="col-10">
              <h3>
                <strong class="text-primary">{{ i + 1 }}. {{ a.mfo }}</strong>
              </h3>
            </div>
            <div class="col-2">
              <small
                class="badge rounded-pill float-end shadow-sm"
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
          </div>
        </div>
        <div class="table-responsive text-wrap">
          <table class="table table-sm">
            <thead>
              <tr>
                <th [width]="300" class="text-center">Success Indicator</th>
                <th [width]="300" class="text-center">Actual Accomplishment</th>
                <th class="text-center">Status</th>
                <th class="text-center">Quantity</th>
                <th class="text-center">Quality</th>
                <th class="text-center">Timeliness</th>
                <th class="text-center">Average</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let b of a.si; let y = index">
                <tr>
                  <!-- <td><strong>{{i+1}}.{{y+1}}</strong></td> -->
                  <td (click)="isShowStandard = true; setSIindex(i, y)">
                    <span class="text-success"
                      ><strong
                        ><u>{{ b.qty }}{{b.qtyUnit ? '%': ''}}</u></strong
                      ></span
                    >
                    <span class="text-success" *ngIf="b.qtyUnit && b.prcntActualQty > 0"
                      ><strong
                        >&nbsp;({{b.prcntActualQty}})</strong
                      ></span
                    >
                    {{ b.indicator }}
                  </td>
                  <td (click)="isShowStandard = true; setSIindex(i, y)">
                    <span *ngIf="b.actual; else noActualSt" class="text-primary"
                      ><strong
                        ><u>{{ b.actual?.totalQty ?? 0 }}{{b.qtyUnit ? '%': ''}}</u></strong
                      ></span
                    >
                    <span class="text-primary" *ngIf="b.qtyUnit && b.actual?.qtyPrcntActual > 0"
                      ><strong
                        >&nbsp;({{b.actual.qtyPrcntActual ?? 0}})</strong
                      ></span
                    >
                    {{ b.actual?.actualAc ?? '' }}
                    <ng-template #noActualSt>
                      <div class="d-flex justify-content-center">
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data
                        </strong>
                      </div>
                    </ng-template>
                  </td>
                  <td (click)="isShowStandard = true; setSIindex(i, y)">
                    <div class="d-flex justify-content-center">
                      <circle-progress
                        [percent]="b.actual?.qtyPrcnt ?? 0"
                        [radius]="40"
                        [outerStrokeWidth]="3"
                        [innerStrokeWidth]="3"
                        [outerStrokeColor]="'#78C000'"
                        [innerStrokeColor]="'#C7E496'"
                        [animation]="true"
                        [animationDuration]="300"
                      ></circle-progress>
                    </div>
                  </td>
                  <td (click)="isShowStandard = true; setSIindex(i, y)">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noQuantiySt">
                        <strong class="text-primary">{{
                          b.actual?.totalQtyRating ?? 0
                        }}</strong>
                      </h2>
                      <ng-template #noQuantiySt>
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data</strong
                        >
                      </ng-template>
                    </div>
                  </td>
                  <td (click)="isShowStandard = true; setSIindex(i, y)">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noQualitySt">
                        <strong class="text-primary">{{
                          b.actual?.totalQlty ?? 0
                        }}</strong>
                      </h2>
                      <ng-template #noQualitySt>
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data</strong
                        >
                      </ng-template>
                    </div>
                  </td>
                  <td (click)="isShowStandard = true; setSIindex(i, y)">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noTimelySt">
                        <strong class="text-primary">{{
                          b.actual?.totalTimely ?? 0
                        }}</strong>
                      </h2>
                      <ng-template #noTimelySt>
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data</strong
                        >
                      </ng-template>
                    </div>
                  </td>
                  <td (click)="isShowStandard = true; setSIindex(i, y)">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noAveSt">
                        <strong class="text-success">{{
                          b.actual?.average ?? 0
                        }}</strong>
                      </h2>
                      <ng-template #noAveSt>
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data</strong
                        >
                      </ng-template>
                    </div>
                  </td>
                  <td >
                    <div class="dropdown position-static float-end">
                      <button
                        type="button"
                        class="btn p-0 dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                      >
                        <i class="bx bx-dots-vertical-rounded text-primary"></i>
                      </button>
                      <div class="dropdown-menu">
                        <a
                          class="dropdown-item cursor-pointer"
                          (click)="isShowCommittedDivions = true; setSIindexTgtCommitted(i, y)"
                          ><i class="bx bx-show-alt me-1"></i> View Committed Divisions</a
                        >
                        <a 
                          *ngIf="b.qtyUnit"
                          (click)="data = b"
                          class="dropdown-item cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#modalOpcrActualQty"
                          ><i class="bx bx-edit-alt me-1"></i> Actual Target</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr
                  *ngIf="isShowStandard && currentSIindex === y && currentMfoindex === i"
                  style="background-color: #f5f5f9;"
                >
                  <td colspan="8">
                    <div class="card">
                      <div class="card-body">
                        <div class="table-responsive text-nowrap">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th [width]="10">Rating</th>
                                <th [width]="10">Quantity</th>
                                <th>Quality</th>
                                <th>Timeliness</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center"><strong>5</strong></td>
                                <td class="text-center">{{ b.qty5 }}</td>
                                <td>{{ b.qlty5 }}</td>
                                <td>{{ b.timely5 }}</td>
                              </tr>
                              <tr>
                                <td class="text-center"><strong>4</strong></td>
                                <td class="text-center">{{ b.qty4 }}</td>
                                <td>{{ b.qlty4 }}</td>
                                <td>{{ b.timely4 }}</td>
                              </tr>
                              <tr>
                                <td class="text-center"><strong>3</strong></td>
                                <td class="text-center">{{ b.qty3 }}</td>
                                <td>{{ b.qlty3 }}</td>
                                <td>{{ b.timely3 }}</td>
                              </tr>
                              <tr>
                                <td class="text-center"><strong>2</strong></td>
                                <td class="text-center">{{ b.qty2 }}</td>
                                <td>{{ b.qlty2 }}</td>
                                <td>{{ b.timely2 }}</td>
                              </tr>
                              <tr>
                                <td class="text-center"><strong>1</strong></td>
                                <td class="text-center">{{ b.qty1 }}</td>
                                <td>{{ b.qlty1 }}</td>
                                <td>{{ b.timely1 }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <ng-container *ngIf="isShowCommittedDivions && currentSIindexTgtCmtd === y && currentMfoindexTgtCmtd === i">
                  <tr style="background-color: #f5f5f9;">
                    <td colspan="8">
                      <div class="card" style="width: 99%;">
                        <div class="card-header">
                          <h3>
                            <strong class="text-secondary"
                              ><i class="bx bx-carousel"></i>&nbsp;{{
                                b.sharedDiv
                              }}</strong
                            >
                            &nbsp;
                            <i class='bx bx-x float-end cursor-pointer' (click)="isShowCommittedDivions = false;setSIindexTgtCommitted(i, y)"></i>
                          </h3>
                        </div>
                        <div class="table-responsive text-wrap">
                          <table class="table table-sm">
                            <thead>
                              <tr>
                                <th
                                  class="text-center"
                                  *ngFor="let c of b.dpcr; let w = index"
                                >
                                  {{ c.divisionName }} - {{c.semester}} Sem 
                                </th>
                                <ng-container *ngIf="!b.qtyUnit">
                                  <th class="text-center">
                                    Total Target Committed
                                  </th>
                                  <th class="text-center">Remaining Target</th>
                                </ng-container>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td
                                  class="text-center"
                                  *ngFor="let c of b.dpcr; let w = index"
                                >
                                  <span
                                    class="badge rounded-pill bg-label-primary"
                                    >{{ c.dpcrData.qty }}</span
                                  >
                                </td>
                                <ng-container *ngIf="!b.qtyUnit">
                                  <td class="text-center">
                                    <span
                                      class="badge rounded-pill bg-label-success"
                                      >{{ b.dpcrTotalCommitted ?? 0 }}</span
                                    >
                                  </td>
                                  <td class="text-center">
                                    <span
                                      class="badge rounded-pill bg-label-warning"
                                      >{{ b.qty - b.dpcrTotalCommitted }}</span
                                    >
                                  </td>
                                </ng-container>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                </ng-container>
              </ng-container>
            </tbody>
          </table>
        </div>
      </div>
    </ng-container>
     <!-- Small Modal OPCR Actual Target-->
     <div class="modal fade" id="modalOpcrActualQty" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2"> Set Actual Target</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-floating px-2">
              <input
                type="number"
                class="form-control"
                id="target"
                [(ngModel)] = "data.prcntActualQty"
                aria-describedby="target"
              />
              <label for="target">Target</label>
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
              (click)="SaveActualTarget()"
              type="button"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ViewOpcrActualDataComponent implements OnInit {
  opcrService = inject(OpcrService);
  opcrDataActual = this.opcrService.opcrDataActual();

  currentSIindex: any = null;
  currentMfoindex: any = null;

  currentSIindexTgtCmtd: any = null;
  currentMfoindexTgtCmtd: any = null;

  currentMfoindexSt: any = null;

  sex: string | null = localStorage.getItem('sex');
  firstName: string | null = localStorage.getItem('firstName');

  firstWord: string = '';
  secondWord: string = '';

  isShowCommittedDivions:boolean = false;
  isShowStandard:boolean = false;

  data  :any = {};

  ngOnInit(): void {}

  SaveActualTarget(){
    this.opcrService.PutOPCRSPrcntActualQty(this.data);
  }

  setSIindex(i: number, y: number) {
    if (this.currentMfoindex === i && this.currentSIindex === y) {
      this.currentSIindex = null;
      this.currentMfoindex = null;
    } else {
      this.currentMfoindex = i;
      this.currentSIindex = y;
    }
  }

  setSIindexTgtCommitted(i: number, y: number) {
    if (this.currentMfoindexTgtCmtd === i && this.currentSIindexTgtCmtd === y) {
      this.currentSIindexTgtCmtd = null;
      this.currentMfoindexTgtCmtd = null;
    } else {
      this.currentMfoindexTgtCmtd = i;
      this.currentSIindexTgtCmtd = y;
    }
  }

  setStMfoIndex(w: number) {
    if (this.currentMfoindexSt === w) {
      this.currentMfoindexSt = null;
    } else {
      this.currentMfoindexSt = w;
    }
  }

  getImageSource(categoryId: number): string {
    if (categoryId === 3) {
      return 'assets/img/support.png';
    } else if (categoryId === 2) {
      return 'assets/img/core.png';
    } else if (categoryId === 1) {
      return 'assets/img/strategic.png';
    } else {
      // Default image path or handle other cases
      return 'assets/img/default.png';
    }
  }

  getUserImageSource(): string {
    if (this.sex === 'MALE') {
      return 'assets/img/illustrations/man-with-laptop-light.png';
    } else if (this.sex === 'FEMALE') {
      return 'assets/img/illustrations/sitting-girl-with-laptop-light.png';
    } else {
      return 'assets/img/illustrations/sitting-girl-with-laptop-light.png';
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
}
