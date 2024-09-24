import { Component, OnInit, inject } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';

@Component({
  selector: 'app-view-dpcr-actual-data',
  template: `
    <app-loading [loading]="dpcrDataActual.isLoading"/>
    <div class="row">
      <div *ngFor="let a of dpcrDataActual.rating; let i = index" class="col-3">
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
                  {{ a.aveByCat | number: '1.2-2'}}
                </div>
                <div class="col-12 text-center mt-1">Average</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div *ngIf="dpcrDataActual.finalRating.total >= 1" class="col-12">
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
                  [ngSwitch]="dpcrDataActual.finalRating.adjectivalRating"
                  class="mt-4 px-4"
                >
                  <p *ngSwitchCase="'Poor'">
                    Hi, <b>{{ dpcrService.divisionName ?? '' }}</b
                    >! Your current rating is
                    <u class="text-danger fs-6 fw-bold">{{
                      dpcrDataActual.finalRating.total
                    }}</u
                    >, which is equivalent to adjectival rating of
                    <span class="badge rounded-pill bg-label-danger">Poor</span
                    >.
                  </p>
                  <p *ngSwitchCase="'Unsatisfactory'">
                    Hello, {{ dpcrService.divisionName ?? '' }}! Unfortunately,
                    your rating is only
                    <u class="text-danger fs-6 fw-bold">{{
                      dpcrDataActual.finalRating.total
                    }}</u
                    >, which results to
                    <span class="badge rounded-pill bg-label-danger"
                      >unsatisfactory</span
                    >
                    rating. Keep on improving your performance.
                  </p>
                  <p *ngSwitchCase="'Satisfactory'">
                    Good job, {{ dpcrService.divisionName ?? '' }}! You have a
                    <span class="badge rounded-pill bg-label-primary"
                      >satistfactory</span
                    >
                    performance with a rating of
                    <u class="text-primary fs-6 fw-bold">{{
                      dpcrDataActual.finalRating.total
                    }}</u
                    >.
                  </p>
                  <p *ngSwitchCase="'Very Satisfactory'">
                    Congratulations,
                    {{ dpcrService.divisionName ?? '' }}! You were able to
                    achieved a
                    <span class="badge rounded-pill bg-label-success"
                      >very satistfactory</span
                    >
                    performance with a rating of
                    <u class="text-success fs-6 fw-bold">{{
                      dpcrDataActual.finalRating.total
                    }}</u
                    >.
                  </p>
                  <p *ngSwitchCase="'Outstanding'">
                    Well done, {{ dpcrService.divisionName ?? '' }}! You did an
                    <span class="badge rounded-pill bg-label-success"
                      >Outstanding</span
                    >
                    performance for a rating of
                    <u class="text-success fs-6 fw-bold">{{
                      dpcrDataActual.finalRating.total
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
    <ng-container *ngFor="let a of dpcrDataActual.data; let i = index">
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
                <th [width]="1"></th>
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let b of a.si; let y = index">
                <tr>
                  <!-- <td><strong>{{i+1}}.{{y+1}}</strong></td> -->
                  <td (click)="GetDpcrMfoEmployee('null', b.actual.dpcrDataId);setSIindex(i, y)">
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
                  <td (click)="setSIindex(i, y)">
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
                  <td (click)="setSIindex(i, y)">
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
                  <td (click)="setSIindex(i, y)">
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
                  <td (click)="setSIindex(i, y)">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noQualitySt">
                        <strong class="text-primary">{{
                          b.actual?.totalQlty ?? 0 | number: '1.2-2'
                        }} </strong>
                      </h2>
                      <ng-template #noQualitySt>
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data</strong
                        >
                      </ng-template>
                    </div>
                  </td>
                  <td (click)="setSIindex(i, y)">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noTimelySt">
                        <strong class="text-primary">{{
                          b.actual?.totalTimely ?? 0 | number: '1.2-2'
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
                  <td (click)="setSIindex(i, y)">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noAveSt">
                        <strong class="text-success">{{
                          b.actual?.average ?? 0 | number: '1.2-2'
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
                          data-bs-toggle="modal"
                          data-bs-target="#modalDpcrActualMfoOts"
                          (click)="GetMfoOts(b?.actual?.dpcrDataId??null)"
                          ><i class="bx bx-show-alt me-1"></i> View OTS</a
                        >
                        <a
                          class="dropdown-item cursor-pointer"
                          (click)="isViewStandard = true"
                          ><i class="bx bx-show-alt me-1"></i> View Standard</a
                        >
                        <a 
                          *ngIf="b.qtyUnit"
                          (click)="data = b"
                          class="dropdown-item cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDpcrActualQty"
                          ><i class="bx bx-edit-alt me-1"></i> Actual Target</a
                        >
                        <a 
                          *ngIf="b.isSubTask"
                          (click)="setRatingData(b.dpcrDataId)"
                          class="dropdown-item cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#modalSetSubtaskRating"
                          ><i class="bx bx-edit-alt me-1"></i> Set Rating</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <ng-container *ngIf="currentSIindex === y && currentMfoindex === i">
                  <tr *ngIf="isViewStandard"     
                    style="background-color: #f5f5f9;"
                  >
                    <td colspan="8">
                      <div class="card">
                        <div class="card-hearer">
                          <button
                              type="button"
                              class="btn-close"
                              style="float: right;"
                              aria-label="Close"
                              (click)="isViewStandard=false"
                          ></button>
                        </div>   
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
                  <tr *ngIf="b.subTasks === null"    
                    style="background-color: #f5f5f9;"
                  >
                    <td colspan="8">
                      <!-- Striped Rows -->
                        <div class="card">
                          <h3 class="card-header"></h3>
                          <div class="table-responsive text-nowrap">
                            <table class="table table-hover">
                              <thead>
                                <tr>
                                  <th colspan="2">Employee</th>
                                  <th class="text-center">Target Committed</th>
                                  <th class="text-center">Target Accomplished</th>
                                </tr>
                              </thead>
                              <tbody class="table-border-bottom-0">
                                <ng-container *ngFor="let emp of dpcrMfoEmployee.data.employee">
                                  <tr>
                                    <td [width]="10">
                                      <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                        <li
                                          data-bs-toggle="tooltip"
                                          data-popup="tooltip-custom"
                                          data-bs-placement="top"
                                          class="avatar avatar-xs pull-up ml-2"
                                          title="Lilian Fuller"
                                        >
                                          <img [src]="emp.profile" loading="lazy" onerror="this.src='./assets/img/avatars/user_picture.png'"/>
                                        </li>
                                      
                                      </ul>
                                    </td>
                                    <td ><strong>{{emp.fullNameFirst}}</strong></td>
                                    <td class="text-center">
                                      {{emp.qty}}
                                    </td>
                                    <td class="text-center"><span class="">{{emp.actualQty}}</span></td>
                                  </tr>   
                                  
                                </ng-container>   
                                <tr style="background-color: #B3E2A7;">
                                    <td colspan="2"><b>TOTAL</b></td>
                                    <td class="text-center"><h5><b>{{dpcrMfoEmployee.data.total.totalQty}}</b></h5></td>
                                    <td class="text-center"><b>{{dpcrMfoEmployee.data.total.totalActualQty}}</b></td>
                                  </tr>          
                              </tbody>
                            </table>
                          </div>
                        </div>
                      <!--/ Striped Rows -->
                    </td>
                  </tr>
                </ng-container>
                
                <ng-container *ngFor="let c of b.subTasks; let w = index">
                  <tr
                    style="background-color: #f5f5f9;"
                    
                  >
                    <td colspan="8">
                      <div class="card">
                        <div class="card-header">
                          <div class="row">
                            <div class="col-12 x-space-between">
                              <div class="">
                                <h3>
                                  <strong class="text-secondary"
                                    >{{ i + 1 }}.{{ w + 1 }}.
                                    {{ c.stMfo }}</strong
                                  >
                                </h3>
                              </div>
                              <div>
                                <span
                                class="badge bg-dark">SUBTASK MFO</span>
                              </div>                 
                            </div>
                          </div>
                        </div>
                        <div class="table-responsive text-wrap">
                          <table class="table table-sm">
                            <thead>
                              <tr>
                                <th [width]="300" class="text-center">
                                  Success Indicator
                                </th>
                                <th [width]="300" class="text-center">
                                  Actual Accomplishment
                                </th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Quantity</th>
                                <th class="text-center">Quality</th>
                                <th class="text-center">Timeliness</th>
                                <th class="text-center">Average</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td (click)="GetDpcrMfoEmployee(c.subTaskId, c.actual.dpcrDataId); setStMfoIndex(w, i)">
                                  <span class="text-success"
                                    ><strong
                                      ><u>{{ c.qty }}{{c.qtyUnit ? '%': ''}}</u></strong
                                    ></span
                                  >
                                  <span class="text-success" *ngIf="c.qtyUnit && c.prcntActualQty > 0"
                                    ><strong
                                      >&nbsp;({{c.prcntActualQty}})</strong
                                    ></span
                                  >
                                  {{ c.stIndicator }}
                                </td>
                                <td (click)="GetDpcrMfoEmployee(c.subTaskId, c.actual.dpcrDataId); setStMfoIndex(w, i)">
                                  <span
                                    *ngIf="c.actual; else noActualSt"
                                    class="text-primary"
                                    ><strong
                                      ><u>{{
                                        c.actual?.totalQty ?? 0
                                      }}{{c.qtyUnit ? '%': ''}}</u></strong
                                    ></span
                                  >
                                  {{ c.actual?.actualAc ?? '' }}
                                  <ng-template #noActualSt>
                                    <div class="d-flex justify-content-center">
                                      <strong
                                        class="badge rounded-pill bg-label-danger shadow-sm"
                                        >no data
                                      </strong>
                                    </div>
                                  </ng-template>
                                </td>
                                <td (click)="GetDpcrMfoEmployee(c.subTaskId, c.actual.dpcrDataId); setStMfoIndex(w, i)">
                                  <div class="d-flex justify-content-center">
                                    <circle-progress
                                      [percent]="c.actual?.qtyPrcnt ?? 0"
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
                                <td (click)="GetDpcrMfoEmployee(c.subTaskId, c.actual.dpcrDataId); setStMfoIndex(w, i)">
                                  <div class="d-flex justify-content-center">
                                    <h2 *ngIf="c.actual; else noQuantiySt">
                                      <strong class="text-primary">{{
                                        c.actual?.totalQtyRating ?? 0
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
                                <td (click)="GetDpcrMfoEmployee(c.subTaskId, c.actual.dpcrDataId); setStMfoIndex(w, i)">
                                  <div class="d-flex justify-content-center">
                                    <h2 *ngIf="c.actual; else noQualitySt">
                                      <strong class="text-primary">{{
                                        c.actual?.totalQlty ?? 0
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
                                <td (click)="GetDpcrMfoEmployee(c.subTaskId, c.actual.dpcrDataId); setStMfoIndex(w, i)">
                                  <div class="d-flex justify-content-center">
                                    <h2 *ngIf="c.actual; else noTimelySt">
                                      <strong class="text-primary">{{
                                        c.actual?.totalTimely ?? 0
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
                                <td (click)="GetDpcrMfoEmployee(c.subTaskId, c.actual.dpcrDataId); setStMfoIndex(w, i)">
                                  <div class="d-flex justify-content-center">
                                    <h2 *ngIf="c.actual; else noAveSt">
                                      <strong class="text-success">{{
                                        c.actual?.average ?? 0
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
                                      <!-- <a
                                        class="dropdown-item cursor-pointer"
                                        (click)="isViewStandard = true"
                                        ><i class="bx bx-show-alt me-1"></i> View Standard</a
                                      > -->
                                      <a 
                                        *ngIf="c.qtyUnit"
                                        (click)="setSTData(b,c)"
                                        class="dropdown-item cursor-pointer"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalDpcrActualQty"
                                        ><i class="bx bx-show-alt me-1"></i> Actual Target</a
                                      >
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <ng-container *ngIf="currentMfoindexSt === w && currentMfoindex == i">
                    <tr *ngIf="isViewStandardSt">
                      <td colspan="8" style="background-color: #f5f5f9;">
                        <div class="card">
                          <div class="card-hearer">
                            <button
                                type="button"
                                class="btn-close"
                                style="float: right;"
                                aria-label="Close"
                                (click)="isViewStandardSt=false"
                            ></button>
                          </div>   
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
                                    <td class="text-center">
                                      <strong>5</strong>
                                    </td>
                                    <td class="text-center">{{ c.qty5 }}</td>
                                    <td>{{ c.qlty5 }}</td>
                                    <td>{{ c.timely5 }}</td>
                                  </tr>
                                  <tr>
                                    <td class="text-center">
                                      <strong>4</strong>
                                    </td>
                                    <td class="text-center">{{ c.qty4 }}</td>
                                    <td>{{ c.qlty4 }}</td>
                                    <td>{{ c.timely4 }}</td>
                                  </tr>
                                  <tr>
                                    <td class="text-center">
                                      <strong>3</strong>
                                    </td>
                                    <td class="text-center">{{ c.qty3 }}</td>
                                    <td>{{ c.qlty3 }}</td>
                                    <td>{{ c.timely3 }}</td>
                                  </tr>
                                  <tr>
                                    <td class="text-center">
                                      <strong>2</strong>
                                    </td>
                                    <td class="text-center">{{ c.qty2 }}</td>
                                    <td>{{ c.qlty2 }}</td>
                                    <td>{{ c.timely2 }}</td>
                                  </tr>
                                  <tr>
                                    <td class="text-center">
                                      <strong>1</strong>
                                    </td>
                                    <td class="text-center">{{ c.qty1 }}</td>
                                    <td>{{ c.qlty1 }}</td>
                                    <td>{{ c.timely1 }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr     
                    style="background-color: #f5f5f9;"
                    >
                      <td colspan="8">
                        <!-- Striped Rows -->
                          <div class="card">
                            <h3 class="card-header"></h3>
                            <div class="table-responsive text-nowrap">
                              <table class="table table-hover">
                                <thead>
                                  <tr>
                                    <th colspan="2">Employee</th>
                                    <th class="text-center">Target Committed</th>
                                    <th class="text-center">Target Accomplished</th>
                                  </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                  <ng-container *ngFor="let emp of dpcrMfoEmployee.data.employee">
                                    <tr>
                                      <td [width]="10">
                                        <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                          <li
                                            data-bs-toggle="tooltip"
                                            data-popup="tooltip-custom"
                                            data-bs-placement="top"
                                            class="avatar avatar-xs pull-up ml-2"
                                            title="Lilian Fuller"
                                          >
                                            <img [src]="emp.profile" loading="lazy" onerror="this.src='./assets/img/avatars/user_picture.png'"/>
                                          </li>
                                        
                                        </ul>
                                      </td>
                                      <td ><strong>{{emp.fullNameFirst}}</strong></td>
                                      <td class="text-center">
                                        {{emp.qty}}
                                      </td>
                                      <td class="text-center"><span class="">{{emp.actualQty}}</span></td>
                                    </tr>                                    
                                  </ng-container>   
                                  <tr style="background-color: #B3E2A7;">
                                      <td colspan="2"><b>TOTAL</b></td>
                                      <td class="text-center"><h5><b>{{dpcrMfoEmployee.data.total.totalQty}}</b></h5></td>
                                      <td class="text-center"><b>{{dpcrMfoEmployee.data.total.totalActualQty}}</b></td>
                                    </tr>          
                                </tbody>
                              </table>
                            </div>
                          </div>
                        <!--/ Striped Rows -->
                      </td>
                    </tr>
                  </ng-container> 
                </ng-container>
              </ng-container>
            </tbody>
          </table>
        </div>
      </div>
    </ng-container>
    <app-modal-dpcr-actual-mfo-ots />
    <!-- Small Modal IPCR Actual Target-->
    <div class="modal fade" id="modalDpcrActualQty" tabindex="-1" aria-hidden="true">
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
    <app-modal-set-subtask-rating/>
  `,
})
export class ViewDpcrActualDataComponent implements OnInit {
  dpcrService     = inject(DpcrService);
  dpcrDataActual  = this.dpcrService.dpcrDataActual();
  dpcrMfoEmployee = this.dpcrService.dpcrMfoEmployee();

  currentSIindex : any = null;
  currentMfoindex: any = null;

  currentMfoindexSt: any = null;

  sex      : string | null = localStorage.getItem('sex');
  firstName: string | null = localStorage.getItem('firstName');

  firstWord : string = '';
  secondWord: string = '';

  isViewStandard  : boolean = false;
  isViewStandardSt: boolean = false;

  data  :any = {};
  stData:any = {};

  ngOnInit(): void {
  }

  setRatingData(dpcrDataId:string){
    this.dpcrService.GetDpcrSubtaskRating(dpcrDataId);
  }

  setSTData(b:any,c:any){
    this.data = b;
    this.data.prcntActualQty = c.prcntActualQty;
    this.data.dpcrDataId = c.actual.dpcrDataId;
    this.data.subTaskId = c.subTaskId;
  }

  SaveActualTarget(){
    if(this.data.isSubTask === 1){
      this.dpcrService.PutSubtaskPrcntActualQty(this.data);
    }else{
      this.data.dpcrDataId = this.data.actual.dpcrDataId
      this.dpcrService.PutDPCRSPrcntActualQty(this.data);
    }
  }

  GetDpcrMfoEmployee(subtaskId:string, dpcrDataId:string){
    this.dpcrService.GetDpcrMfoEmployee(subtaskId, dpcrDataId);
  }

  GetMfoOts(dpcrDataId:string){
    this.dpcrService.GetDpcrMfoOts(dpcrDataId);
  }

  setSIindex(i: number, y: number) {
    if (this.currentMfoindex === i && this.currentSIindex === y) {
      this.currentSIindex = null;
      this.currentMfoindex = null;
    } else {
      this.currentMfoindex = i;
      this.currentSIindex = y;
    }
    this.currentMfoindexSt = null;
  }

  setStMfoIndex(w: number, i: number) {
    this.currentMfoindex = i;

    if (this.currentMfoindexSt === w) {
      this.currentMfoindexSt = null;
    } else {
      this.currentMfoindexSt = w;
    }

    this.currentSIindex = null;
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
