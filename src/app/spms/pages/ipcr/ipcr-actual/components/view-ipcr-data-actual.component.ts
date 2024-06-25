import { Component, OnInit , inject } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { OtsService } from 'src/app/spms/service/ots.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-view-ipcr-data-actual',
  template: `
  <app-loading [loading]="ipcrDataActual.isLoading"/>
    <div class="row">
      <div *ngFor="let a of ipcrDataActual.rating; let i = index" class="col-3">
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
      <div *ngIf="ipcrDataActual.finalRating.total >= 1" class="col-12">
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
                <div [ngSwitch]="ipcrDataActual.finalRating.adjectivalRating" class="mt-4 px-4">
                <p *ngSwitchCase="'Poor'" >
                    Hi, {{firstName??'' | firstLetterUppercase}}!
                    Your current rating is <u class="text-danger fs-6 fw-bold">{{ipcrDataActual.finalRating.total}}</u>,
                    which is equivalent to adjectival rating of <span class="badge rounded-pill bg-label-danger">Poor</span>.
                  </p>
                  <p *ngSwitchCase="'Unsatisfactory'" >
                    Hello, {{firstName??'' | firstLetterUppercase}}!
                    Unfortunately, your rating is only <u class="text-danger fs-6 fw-bold">{{ipcrDataActual.finalRating.total}}</u>,
                    which results to <span class="badge rounded-pill bg-label-danger">unsatisfactory</span>
                    rating. Keep on improving your performance.
                  </p>
                  <p *ngSwitchCase="'Satisfactory'" >
                    Good job, {{firstName??'' | firstLetterUppercase}}!
                    You have a <span class="badge rounded-pill bg-label-primary">satistfactory</span> performance with a rating of
                    <u class="text-primary fs-6 fw-bold">{{ipcrDataActual.finalRating.total}}</u>.
                  </p>
                  <p *ngSwitchCase="'Very Satisfactory'" >
                    Congratulations, {{firstName??'' | firstLetterUppercase}}!
                    You were able to achieved a <span class="badge rounded-pill bg-label-success">very satistfactory</span> performance with a rating of
                    <u class="text-success fs-6 fw-bold">{{ipcrDataActual.finalRating.total}}</u>.
                  </p>
                  <p *ngSwitchCase="'Outstanding'" >
                    Well done, {{firstName??'' | firstLetterUppercase}}!
                    You did an <span class="badge rounded-pill bg-label-success">Outstanding</span> performance for a rating of
                    <u class="text-success fs-6 fw-bold">{{ipcrDataActual.finalRating.total}}</u>.
                  </p>
                  <p *ngSwitchDefault>Default Content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ng-container *ngFor="let a of ipcrDataActual.data; let i = index">
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
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let b of a.si; let y = index">
                <tr>
                  <!-- <td><strong>{{i+1}}.{{y+1}}</strong></td> -->
                  <td (click)="setSIindex(i, y);GetMfoOtsPaginate(b.ipcrDataId, '')">
                    <span class="text-success"
                      ><strong>{{ b.qty }}{{b.qtyUnit? '%':''}}</strong></span
                    >
                    {{ b.indicator }}
                  </td>
                  <td (click)="setSIindex(i, y);GetMfoOtsPaginate(b.ipcrDataId, '')">
                    <span *ngIf="b.actual; else noActual" class="text-primary"
                      ><strong>{{ b.actual?.totalQty ?? 0 }}{{b.qtyUnit? '%':''}}</strong></span
                    >
                    {{ b.actual?.actualAc ?? '' }}
                    <ng-template #noActual>
                      <div class="d-flex justify-content-center">
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data
                        </strong>
                      </div>
                    </ng-template>
                  </td>
                  <td (click)="setSIindex(i, y);GetMfoOtsPaginate(b.ipcrDataId, '')">
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
                  <td (click)="setSIindex(i, y);GetMfoOtsPaginate(b.ipcrDataId, '')">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noQuantiy">
                        <strong class="text-primary">{{
                          b.actual?.totalQtyRating ?? 0
                        }}</strong>
                      </h2>
                      <ng-template #noQuantiy>
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data</strong
                        >
                      </ng-template>
                    </div>
                  </td>
                  <td (click)="setSIindex(i, y);GetMfoOtsPaginate(b.ipcrDataId, '')">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noQuality">
                        <strong class="text-primary">{{
                          b.actual?.totalQlty ?? 0
                        }}</strong>
                      </h2>
                      <ng-template #noQuality>
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data</strong
                        >
                      </ng-template>
                    </div>
                  </td>
                  <td (click)="setSIindex(i, y);GetMfoOtsPaginate(b.ipcrDataId, '')">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noTimely">
                        <strong class="text-primary">{{
                          b.actual?.totalTimely ?? 0
                        }}</strong>
                      </h2>
                      <ng-template #noTimely>
                        <strong
                          class="badge rounded-pill bg-label-danger shadow-sm"
                          >no data</strong
                        >
                      </ng-template>
                    </div>
                  </td>
                  <td (click)="setSIindex(i, y);GetMfoOtsPaginate(b.ipcrDataId, '')">
                    <div class="d-flex justify-content-center">
                      <h2 *ngIf="b.actual; else noAve">
                        <strong class="text-success">{{
                          b.actual?.average ?? 0
                        }}</strong>
                      </h2>
                      <ng-template #noAve>
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
                          (click)="isViewStandard=true"
                          ><i class="bx bx-show-alt me-1"></i> View Standard</a
                        >
                        <a 
                          *ngIf="b.qtyUnit"
                          (click)="data = b"
                          class="dropdown-item cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#modalIpcrActualQty"
                          ><i class="bx bx-show-alt me-1"></i> Actual Target</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr
                  *ngIf="currentSIindex === y && currentMfoindex === i && isViewStandard"
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
                <tr *ngIf="currentSIindex === y && currentMfoindex === i" style="background-color: #f5f5f9;">
                  <td colspan="8">
                  <div class="nav-align-top mb-4">
                    <ul class="nav nav-tabs nav-fill" role="tablist">
                      <li class="nav-item">
                        <button
                          type="button"
                          class="nav-link active"
                          role="tab"
                          data-bs-toggle="tab"
                          data-bs-target="#navs-justified-home"
                          aria-controls="navs-justified-home"
                          aria-selected="true"
                          (click)="handleOtsTab(1)"
                        >
                          OTS
                        </button>
                      </li>
                      <li class="nav-item">
                        <button
                          type="button"
                          class="nav-link"
                          role="tab"
                          data-bs-toggle="tab"
                          data-bs-target="#navs-justified-profile"
                          aria-controls="navs-justified-profile"
                          aria-selected="false"
                          (click)="handleOtsTab(0)"
                        >
                          PENDING
                          <span *ngIf="otsMfo.data.metadata.totalItemsUnapproved > 0" class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger">{{otsMfo.data.metadata.totalItemsUnapproved}}</span>
                        </button>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <div class="tab-pane fade show active" id="navs-justified-home" role="tabpanel">
                        <div style="display: flex;">
                          <div style="max-width: 150px;">
                            <div class="form-floating py-1">
                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                                    [(ngModel)]="monthNo" (ngModelChange)="handleMonth($event)">
                                    <option selected disabled hidden>Open this select menu</option>
                                    <option *ngFor="let month of months" [value]="month.id">{{ month.month }}
                                    </option>
                                </select>
                                <label for="floatingSelect"><i class='bx bx-calendar'></i>&nbsp;Months</label>
                            </div>
                          </div>
                          <div class="m-3">
                            <button class="btn btn-primary" (click)="setOtsData(a,b)" data-bs-toggle="modal" data-bs-target="#modalOts">
                              <i class='bx bx-plus'></i>OTS
                            </button>
                          </div>
                        </div>
                        <div class="row" *ngIf="otsMfo.data.items.length > 0; else noOts">
                          <div class="table-responsive text-nowrap col-8">
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th [width]="150">Date</th>
                                  <th [width]="10">Quantity</th>
                                  <th [width]="10">Quality</th>
                                  <th [width]="10">Timeliness</th>
                                  <th >Description</th>
                                  <th >Action</th>

                                </tr>
                              </thead>
                              <tbody>
                                <ng-container *ngFor="let ots of otsMfo.data.items">
                                  <tr>
                                    <td class="text-center"><strong>{{ots.dateDone | date:'MMM. dd, yyyy' }}</strong></td>
                                    <td class="text-center">{{ ots.qtyR }}</td>
                                    <td class="text-center">{{ ots.qltyR }}</td>
                                    <td class="text-center">{{ ots.timelyR }}</td>  
                                    <td >{{ ots.description }}</td>  
                                    <td>
                                      <i class="bx bx-edit-alt me-1 cursor-pointer px-1 icon-hover-edit" (click)="setOtsUpdate(ots);setOtsData(a,b)" data-bs-toggle="modal" data-bs-target="#modalUpdateOts"></i>
                                      <i class="bx bx-trash cursor-pointer me-1 px-1 icon-hover-delete" (click)="DeleteOts(ots.otsId)"></i>
                                    </td>                                                                            
                                  </tr> 
                                </ng-container>                        
                              </tbody>
                              <tfoot class="table-border-bottom-0">
                                  <tr>
                                      <th colspan="8">
                                          <mat-paginator #paginator class="demo-paginator" (page)="handlePageEvent($event)"
                                              [length]="otsMfo.data.metadata.totalItems" [pageSize]="otsMfo.data.metadata.pageSize" [disabled]="false"
                                              [showFirstLastButtons]="true"
                                              [pageSizeOptions]="true ? pageSizeOptions : []"
                                              [hidePageSize]="false" [pageIndex]="otsMfo.data.metadata.pageNumber - 1 "
                                              aria-label="Select page">
                                          </mat-paginator>
                                      </th>
                                  </tr>
                              </tfoot>
                            </table>
                          </div>
                          <div class="table-responsive text-nowrap col-4">
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th colspan="5">MPOR</th>                         
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th colspan="5" class="text-center">QUANTITY</th>                         
                                </tr>
                                <tr>                                
                                  <td >Week 1</td>  
                                  <td >Week 2</td>  
                                  <td >Week 3</td>                                                                             
                                  <td >Week 4</td>  
                                  <td >Total</td>  
                                </tr> 
                                <tr>                                
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qtyWk1}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qtyWk2}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qtyWk3}}</b></td>                                                                             
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qtyWk4}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qtyTotal}}</b></td>  
                                </tr> 
                                <tr>
                                  <th colspan="5" class="text-center">QUALITY</th>                         
                                </tr>
                                <tr>                                
                                  <td >Week 1</td>  
                                  <td >Week 2</td>  
                                  <td >Week 3</td>                                                                             
                                  <td >Week 4</td>  
                                  <td >Total</td>  
                                </tr> 
                                <tr>                                
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qltyWk1}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qltyWk2}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qltyWk3}}</b></td>                                                                             
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qltyWk4}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.qltyTotal}}</b></td>  
                                </tr> 
                                <tr>
                                  <th colspan="5" class="text-center">TIMELINESS</th>                         
                                </tr>
                                <tr>                                
                                  <td >Week 1</td>  
                                  <td >Week 2</td>  
                                  <td >Week 3</td>                                                                             
                                  <td >Week 4</td>  
                                  <td >Total</td>  
                                </tr>
                                <tr>                                
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.timelyWk1}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.timelyWk2}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.timelyWk3}}</b></td>                                                                             
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.timelyWk4}}</b></td>  
                                  <td class="text-center"><b class="text-primary">{{otsMfo.data.rating.timelyTotal}}</b></td>  
                                </tr>  
                              </tbody>                       
                            </table>
                          </div>
                        </div>  
                        <ng-template #noOts>
                          <div class="d-flex justify-content-center">
                            <strong
                              class="badge rounded-pill bg-label-danger shadow-sm"
                              >no data
                            </strong>
                          </div>
                        </ng-template>                  
                      </div>
                      <div class="tab-pane fade" id="navs-justified-profile" role="tabpanel">
                        <table class="table table-bordered" *ngIf="otsMfo.data.items.length > 0; else noPendingOts">
                          <thead>
                            <tr>
                              <th [width]="150">Date</th>
                              <th [width]="10">Quantity</th>
                              <th [width]="10">Quality</th>
                              <th [width]="10">Timeliness</th>
                              <th >Description</th>
                              <th [width]="110">Action</th>

                            </tr>
                          </thead>
                          <tbody>
                            <ng-container *ngFor="let ots of otsMfo.data.items">
                              <tr>
                                <td class="text-center"><strong>{{ots.dateDone | date:'MMM. dd, yyyy' }}</strong></td>
                                <td class="text-center">{{ ots.qtyR }}</td>
                                <td class="text-center">{{ ots.qltyR }}</td>
                                <td class="text-center">{{ ots.timelyR }}</td>  
                                <td >{{ ots.description }}</td> 
                                <td>
                                  <i class="bx bx-edit-alt me-1 cursor-pointer px-1 icon-hover-edit" (click)="setOtsUpdate(ots);setOtsData(a,b)" data-bs-toggle="modal" data-bs-target="#modalUpdateOts"></i>
                                  <i class="bx bx-trash cursor-pointer me-1 px-1 icon-hover-delete" (click)="DeleteOts(ots.otsId)"></i>
                                </td>                                                   
                              </tr> 
                            </ng-container>                        
                          </tbody>
                          <tfoot class="table-border-bottom-0">
                              <tr>
                                  <th colspan="8">
                                      <mat-paginator #paginator class="demo-paginator" (page)="handlePageEvent($event)"
                                          [length]="otsMfo.data.metadata.totalItems" [pageSize]="otsMfo.data.metadata.pageSize" [disabled]="false"
                                          [showFirstLastButtons]="true"
                                          [pageSizeOptions]="true ? pageSizeOptions : []"
                                          [hidePageSize]="false" [pageIndex]="otsMfo.data.metadata.pageNumber - 1 "
                                          aria-label="Select page">
                                      </mat-paginator>
                                  </th>
                              </tr>
                          </tfoot>
                        </table>
                        <ng-template #noPendingOts>
                          <div class="d-flex justify-content-center">
                            <strong
                              class="badge rounded-pill bg-label-danger shadow-sm"
                              >no data
                            </strong>
                          </div>
                        </ng-template> 
                      </div>    
                    </div>
                  </div>
                  </td>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>
      </div>
    </ng-container>
    <!-- Small Modal IPCR Actual Target-->
    <div class="modal fade" id="modalIpcrActualQty" tabindex="-1" aria-hidden="true">
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
    <app-modal-ots otsMfoes="[]" [isShowMfoes]="false" [ots]="ots" (submit)="submitOts()"/>
    <div
      class="modal fade"
      id="modalUpdateOts"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-m"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">
              <strong>UPDATE OUTPUT TRACKING SHEET</strong>
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
            <div >
              <div class="card bg-primary text-white mb-2">
                <div class="card-body p-3">
                  <h5 class="card-title text-white">MFO</h5>
                  <p class="card-text">{{ots?.mfo}}</p>
                  <!--  -->
                </div>
              </div>
              <div class="card bg-success text-white mb-2">
                <div class="card-body p-3">
                  <h5 class="card-title text-white">SUCCESS INDICATOR</h5>
                  <p class="card-text flex">
                    <strong class="text-white"
                      ><u>{{  ots.qty }}{{ ots.qtyUnit ? '%' : '' }}</u>
                    </strong>
                    {{ots?.indicator}}     
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
                  [(ngModel)]="ots.dateDone"
                  id="html5-datetime-local-input"
                  min="2023-11-1T08:00 | date:'yyyy-MM-ddTHH:mm'"
                />
              </div>
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
            <button type="button" (click)="UpdateOts()" class="btn btn-primary" data-bs-dismiss="modal">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

  `,
})
export class ViewIpcrDataActualComponent implements OnInit {
  pageEvent: PageEvent | undefined;

  ipcrService    = inject(IpcrService);
  otsService     = inject(OtsService);

  ipcrDataActual = this.ipcrService.ipcrDataActual();
  otsMfo         = this.otsService.otsMfo();

  currentSIindex  : any = null;
  currentMfoindex : any = null;

  sex       : string | null = localStorage.getItem('sex');
  firstName : string | null = localStorage.getItem('firstName');

  firstWord  : string = '';
  secondWord : string = '';

  data     : any = {};
  paginate : any = {};
  ots      : any = {};

  ipcrDataId : string = '';
  subtaskId  : string = '';
  otsStatus  : number = 1;

  isViewStandard  : boolean = false;

  pageSizeOptions = [5, 10, 50, 100];

  page: any = {
    pageNumber: 1,
    pageSize: 10,
  };

  monthNo:number = new Date().getMonth() + 1;

  months: any = [
    {id: 1,  month: "January"},
    {id: 2,  month: "Febuary"},
    {id: 3,  month: "March"},
    {id: 4,  month: "April"},
    {id: 5,  month: "May"},
    {id: 6,  month: "June"},
    {id: 7,  month: "July"},
    {id: 8,  month: "August"},
    {id: 9,  month: "September"},
    {id: 10, month: "October"},
    {id: 11, month: "November"},
    {id: 12, month: "December"},
  ]

  ngOnInit(): void {
  }

  GetIPCRActual(){
    this.ipcrService.GetIPCRDataActual(localStorage.getItem('ipcrIdActual') ?? "");
  }

  GetMfoOts(ipcrDataId:string){
    this.otsService.GetMfoOts(ipcrDataId);
  }

  GetMfoOtsPaginate(ipcrDataId:string, subtaskId:string){
    this.ipcrDataId = ipcrDataId;
    this.subtaskId  = subtaskId;

    this.paginate.ipcrDataId = ipcrDataId;
    this.paginate.subTaskId  = subtaskId;
    this.paginate.status     = this.otsStatus;
    this.paginate.monthNo    = this.monthNo;
    this.paginate.pageNumber = 1;
    this.paginate.pageSize   = 10;

    this.otsService.GetMfoOtsPaginated(this.paginate);
  }

  submitOts(){
    this.GetMfoOtsPaginate(this.ipcrDataId, this.subtaskId);
    this.GetIPCRActual();
  }

  handleOtsTab(otsStatus:number){
    this.paginate.ipcrDataId = this.ipcrDataId;
    this.paginate.subTaskId  = this.subtaskId;
    this.paginate.status     = otsStatus;
    this.paginate.monthNo    = this.monthNo;
    this.paginate.pageNumber = 1;
    this.paginate.pageSize   = 10;

    this.otsService.GetMfoOtsPaginated(this.paginate);
  }

  handleMonth(value:any){
    this.monthNo = value;

    this.paginate.ipcrDataId = this.ipcrDataId;
    this.paginate.subTaskId  = this.subtaskId;
    this.paginate.status     = this.otsStatus;
    this.paginate.monthNo    = value;
    this.paginate.pageNumber = 1;
    this.paginate.pageSize   = 10;

    this.otsService.GetMfoOtsPaginated(this.paginate);  }

  handlePageEvent(e: PageEvent) {
    this.page.pageNumber = e.pageIndex + 1;
    this.page.pageSize = e.pageSize;
    //this.post_all_logs();
  }

  SaveActualTarget(){
    //console.log(this.data)
    this.ipcrService.PutIPCRSPrcntActualQty(this.data);
  }

  UpdateOts(){
    this.otsService.EditOts(this.ots);
    this.otsService.GetMfoOtsPaginated(this.paginate);
    this.GetIPCRActual();

  }

  DeleteOts(otsId:string){
    this.otsService.DeleteOts(otsId);
    setTimeout(() => {
      this.otsService.GetMfoOtsPaginated(this.paginate);
      this.GetIPCRActual();

    }, 1000);

  }

  setOtsData(mfo:any, si:any){
    this.ots.mfo         = mfo.mfo;
    this.ots.mfoId       = mfo.mfoId;
    this.ots.indicator   = si.indicator;
    this.ots.indicatorId = si.indicatorId;
    this.ots.qty         = si.qty;
    this.ots.dpcrDataId  = si.dpcrDataId;
    this.ots.ipcrDataId  = si.ipcrDataId;
    this.ots.ipcrId      = si.ipcrId;
    this.ots.isSubTask   = si.isSubTask;
    this.ots.opcrDataId  = si.opcrDataId;
    this.ots.qtyUnit     = si.qtyUnit;
    this.ots.qlty5       = si.qlty5;
    this.ots.qlty4       = si.qlty4;
    this.ots.qlty3       = si.qlty3;
    this.ots.qlty2       = si.qlty2;
    this.ots.qlty1       = si.qlty1;
    this.ots.timely5     = si.timely5;
    this.ots.timely4     = si.timely4;
    this.ots.timely3     = si.timely3;
    this.ots.timely2     = si.timely2;
    this.ots.timely1     = si.timely1;
  }

  setOtsUpdate(otsData:any){
    this.ots.qtyR        = otsData.qtyR;
    this.ots.qltyR       = otsData.qltyR;
    this.ots.timelyR     = otsData.timelyR;

    this.ots.dateDone    = otsData.dateDone;
    this.ots.description = otsData.description;
    this.ots.userId      = otsData.userId;
    this.ots.otsGroupId  = otsData.otsGroupId;
    this.ots.recNo       = otsData.recNo;
    this.ots.ipcrDataId  = otsData.ipcrDataId;
    this.ots.subTaskId   = otsData.subTaskId;
    this.ots.otsId       = otsData.otsId;
    this.ots.tag         = otsData.tag;
    this.ots.status      = otsData.status;

  }

  setQuality(rating: number) {
    this.ots.qltyR = rating;
  }

  setTimeliness(rating: number) {
    this.ots.timelyR = rating;
  }

  setSIindex(i: number, y: number) {
    this.monthNo = new Date().getMonth() + 1;

    if (this.currentMfoindex === i && this.currentSIindex === y) {
      this.currentSIindex = null;
      this.currentMfoindex = null;
    } else {
      this.currentMfoindex = i;
      this.currentSIindex = y;
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

  getRating(value: string): string {
    let result = '';

    switch (value) {
      case 'Poor':
        this.firstWord = 'Hello';
        //this.secondWord =
        result = 'your current performance is';
        break;
      case 'Unsatisfactory':
        this.firstWord = 'Hi,';
        //this.secondWord =
        result =
          'Unfortunately, your rating is only {{rating}}, which results to unsatisfactory rating. Keep on improving your performance.';
        break;
      case 'Satisfactory':
        this.firstWord = 'Good job!';
        // this.secondWord =
        result =
          'Good job, ' +
          this.toUpperFirst(this.firstName ?? '') +
          '! You have a <u>satistfactory</u> performance with a rating of ';
        break;
      case 'Very Satisfactory':
        this.firstWord = 'Congratulations!';
        result =
          'you were able to achieved a very satisfactory performance by reaching {{rating}}' +
          'rating.';
        break;
      case 'Outstanding':
        this.firstWord = 'Wow! Congratulations';
        result = 'you did an  job for ';
        break;
    }

    return result;
  }

  toUpperFirst(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  getUserImageSource(): string {
    if (this.sex === 'MALE') {
      return 'assets/img/illustrations/man-with-laptop-light.png';
    } else if (this.sex === 'FEMALE') {
      return 'assets/img/illustrations/girl-doing-yoga-light.png';
    } else {
      return 'assets/img/illustrations/default.png';
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
