import { Component, OnInit , inject } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
@Component({
  selector: 'app-view-ipcr-data-actual',
  template: `
    <ng-container *ngFor="let a of ipcrDataActual.data; let i = index">
      <div class="card mb-2">
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
                <tr (click)="setSIindex(i,y)">
                  <!-- <td><strong>{{i+1}}.{{y+1}}</strong></td> -->
                  <td>
                    <span class="text-success"
                      ><strong>{{ b.qty }}</strong></span
                    >
                    {{ b.indicator }}
                  </td>
                  <td>
                    <span *ngIf="b.actual; else noActual" class="text-primary"
                      ><strong>{{ b.actual?.totalQty ?? 0 }}</strong></span
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
                  <td>
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
                  <td>
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
                  <td>
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
                </tr>
                <tr *ngIf="currentSIindex === y && currentMfoindex === i" style="background-color: #f5f5f9;">
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
                                <td class="text-center">{{b.qty5}}</td>
                                <td>{{b.qlty5}}</td>
                                <td>{{b.timely5}}</td>
                              </tr>
                              <tr>
                                <td class="text-center"><strong>4</strong></td>
                                <td class="text-center">{{b.qty4}}</td>
                                <td>{{b.qlty4}}</td>
                                <td>{{b.timely4}}</td>
                              </tr>
                              <tr>
                                <td class="text-center"><strong>3</strong></td>
                                <td class="text-center">{{b.qty3}}</td>
                                <td>{{b.qlty3}}</td>
                                <td>{{b.timely3}}</td>
                              </tr>
                              <tr>
                                <td class="text-center"><strong>2</strong></td>
                                <td class="text-center">{{b.qty2}}</td>
                                <td>{{b.qlty2}}</td>
                                <td>{{b.timely2}}</td>
                              </tr>
                              <tr>
                                <td class="text-center"><strong>1</strong></td>
                                <td class="text-center">{{b.qty1}}</td>
                                <td>{{b.qlty1}}</td>
                                <td>{{b.timely1}}</td>
                              </tr>
                            </tbody>
                          </table>
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
  `,
})
export class ViewIpcrDataActualComponent implements OnInit {
  ipcrService = inject(IpcrService);
  ipcrDataActual = this.ipcrService.ipcrDataActual();

  currentSIindex:any = null;
  currentMfoindex:any = null;

  ngOnInit(): void {}

  setSIindex(i:number, y:number){
    if(this.currentMfoindex === i && this.currentSIindex === y){
      this.currentSIindex = null;
      this.currentMfoindex = null;

    }else{
      this.currentMfoindex = i;
      this.currentSIindex = y;
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
