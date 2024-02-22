import { Component, OnInit, inject } from '@angular/core';
import { OpcrService } from 'src/app/spms/service/opcr.service';
@Component({
  selector: 'app-view-opcr-actual-data',
  template: `
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
                    Hello, {{ opcrService.officeName ?? '' }}!
                    Unfortunately, your rating is only
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
                    Good job, {{ opcrService.officeName ?? '' }}! You
                    have a
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
                    {{ opcrService.officeName ?? '' }}! You were able
                    to achieved a
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
                    Well done, {{ opcrService.officeName ?? '' }}! You
                    did an
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
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let b of a.si; let y = index">
                <tr (click)="setSIindex(i, y)">
                  <!-- <td><strong>{{i+1}}.{{y+1}}</strong></td> -->
                  <td>
                    <span class="text-success"
                      ><strong><u>{{ b.qty }}</u></strong></span
                    >
                    {{ b.indicator }}
                  </td>
                  <td>
                    <span *ngIf="b.actual; else noActualSt" class="text-primary"
                      ><strong><u>{{ b.actual?.totalQty ?? 0 }}</u></strong></span
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
                  <td>
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
                  <td>
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
                  <td>
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
                  <td>
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
                  <td>
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
                </tr>
                <tr
                  *ngIf="currentSIindex === y && currentMfoindex === i"
                  style="background-color: #f5f5f9;"
                >
                  <td colspan="7">
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
                <ng-container *ngFor="let c of b.subTasks; let w = index">
                  <tr style="background-color: #f5f5f9;" (click)="setStMfoIndex(w)">
                    <td colspan="7">
                      <div class="card">
                        <div class="card-header">
                          <div class="row">
                            <div class="col-12">
                              <h3>
                                <strong class="text-secondary"
                                  >{{ i + 1 }}.{{ w + 1 }}. {{ c.stMfo }}</strong
                                >
                              </h3>
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
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <span class="text-success"
                                    ><strong><u>{{ c.qty }}</u></strong></span
                                  >
                                  {{ c.stIndicator }}
                                </td>
                                <td>
                                  <span
                                    *ngIf="c.actual; else noActualSt"
                                    class="text-primary"
                                    ><strong><u>{{
                                      c.actual?.totalQty ?? 0
                                    }}</u></strong></span
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
                                <td>
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
                                <td>
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
                                <td>
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
                                <td>
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
                                <td>
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
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr *ngIf="currentMfoindexSt === w">
                    <td colspan="7" style="background-color: #f5f5f9;">
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
                                  <td class="text-center">{{ c.qty5 }}</td>
                                  <td>{{ c.qlty5 }}</td>
                                  <td>{{ c.timely5 }}</td>
                                </tr>
                                <tr>
                                  <td class="text-center"><strong>4</strong></td>
                                  <td class="text-center">{{ c.qty4 }}</td>
                                  <td>{{ c.qlty4 }}</td>
                                  <td>{{ c.timely4 }}</td>
                                </tr>
                                <tr>
                                  <td class="text-center"><strong>3</strong></td>
                                  <td class="text-center">{{ c.qty3 }}</td>
                                  <td>{{ c.qlty3 }}</td>
                                  <td>{{ c.timely3 }}</td>
                                </tr>
                                <tr>
                                  <td class="text-center"><strong>2</strong></td>
                                  <td class="text-center">{{ c.qty2 }}</td>
                                  <td>{{ c.qlty2 }}</td>
                                  <td>{{ c.timely2 }}</td>
                                </tr>
                                <tr>
                                  <td class="text-center"><strong>1</strong></td>
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
                </ng-container>
              </ng-container>
            </tbody>
          </table>
        </div>
      </div>
    </ng-container>
  `,
})
export class ViewOpcrActualDataComponent implements OnInit {
  opcrService = inject(OpcrService);
  opcrDataActual = this.opcrService.opcrDataActual();

  currentSIindex: any = null;
  currentMfoindex: any = null;

  currentMfoindexSt: any = null;

  sex: string | null = localStorage.getItem('sex');
  firstName: string | null = localStorage.getItem('firstName');

  firstWord: string = '';
  secondWord: string = '';

  ngOnInit(): void {}

  setSIindex(i: number, y: number) {
    if (this.currentMfoindex === i && this.currentSIindex === y) {
      this.currentSIindex = null;
      this.currentMfoindex = null;
    } else {
      this.currentMfoindex = i;
      this.currentSIindex = y;
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
