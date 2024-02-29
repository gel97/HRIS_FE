import { Component } from '@angular/core';

@Component({
  selector: `app-opcr-target-skeleton`,
  template: ` <div *ngFor="let item of repeatCount">
    <br />
    <div class="card p-4">
      <div class="row">
        <div class="col-12" style="height: 10px;"></div>
        <!-- BODY -->
        <div class="col-4">
          <ngx-skeleton-loader
            count="1"
            animation="pulse"
            appearance="line"
            [theme]="{ 'margin-top': '10px' }"
          ></ngx-skeleton-loader>
        </div>
        <div class="col-6"></div>
        <div class="col-2">
          <ngx-skeleton-loader
            count="1"
            animation="pulse"
            appearance="line"
            [theme]="{ 'margin-top': '10px' }"
          ></ngx-skeleton-loader>
        </div>
        <div class="col-12">
          <ngx-skeleton-loader
            count="1"
            animation="pulse"
            appearance="line"
            [theme]="{ 'margin-top': '30px' }"
          ></ngx-skeleton-loader>
        </div>
        <div class="row">
          <div class="col-10">
            <ngx-skeleton-loader
              count="1"
              animation="pulse"
              appearance="line"
              [theme]="{ 'margin-top': '10px' }"
            ></ngx-skeleton-loader>
          </div>
          <div class="col-1">
            <ngx-skeleton-loader
              count="1"
              animation="pulse"
              appearance="circle"
              [theme]="{ 'margin-top': '10px' }"
            ></ngx-skeleton-loader>
          </div>
          <div class="col-1">
            <ngx-skeleton-loader
              count="1"
              animation="pulse"
              appearance="circle"
              [theme]="{ 'margin-top': '10px' }"
            ></ngx-skeleton-loader>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class OpcrTargetSkeletonComponent {
  repeatCount = new Array(2);
}
