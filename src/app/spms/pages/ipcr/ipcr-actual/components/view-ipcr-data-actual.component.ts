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
                <th [width]="300">Success Indicator</th>
                <th [width]="300">Actual Accomplishment</th>
                <th>Quantiy Completed</th>
                <th>Quality</th>
                <th>Timeliness</th>
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let b of a.si; let y = index">
                <tr>
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
                      <strong
                        class="badge rounded-pill bg-label-danger shadow-sm"
                        >no data</strong
                      >
                    </ng-template>
                  </td>
                  <td>
                    <circle-progress
                      [percent]="b.actual?.qtyPrcnt ?? 0"
                      [radius]="40"
                      [outerStrokeWidth]="3"
                      [innerStrokeWidth]="3"
                      [outerStrokeColor]="'#78C000'"
                      [innerStrokeColor]="'#C7E596'"
                      [animation]="true"
                      [animationDuration]="300"
                    ></circle-progress>
                  </td>
                  <td>
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
                  </td>
                  <td>
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
  ngOnInit(): void {}

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
