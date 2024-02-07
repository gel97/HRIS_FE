import { Component } from '@angular/core';
@Component({
  selector: `app-mfo-skeleton`,
  template: ` <div class="row">
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
    <div class="col-8"></div>
    <div *ngFor="let item of repeatCount">
      <div class="row">
        <div class="col-8">
          <ngx-skeleton-loader
            count="1"
            animation="pulse"
            appearance="line"
            [theme]="{ 'margin-top': '25px' }"
          ></ngx-skeleton-loader>
        </div>
        <div class="col-4">
          <ngx-skeleton-loader
            count="1"
            animation="pulse"
            appearance="line"
            [theme]="{ 'margin-top': '25px' }"
          ></ngx-skeleton-loader>
        </div>
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
      </div>
    </div>
  </div>`,
})
export class MfoSkeletonComponent {
  repeatCount = new Array(10);
}
