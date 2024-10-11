import { Component } from '@angular/core';

@Component({
  selector: `app-logs-skeleton`,
  template: ` <div class="card p-4">
    <div class="row">
      <!-- HEAD -->
      <div class="col-2"></div>
      <div class="col-2">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-2">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-2">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-2">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-2">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <!-- BODY -->
      <div *ngFor="let item of repeatCount">
        <div class="row">
          <div class="col-1">
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
          <div class="col-6">
            <ngx-skeleton-loader
              count="1"
              animation="pulse"
              appearance="line"
              [theme]="{ 'margin-top': '10px' }"
            ></ngx-skeleton-loader>
          </div>
          <div class="col-4">
            <ngx-skeleton-loader
              count="1"
              animation="pulse"
              appearance="line"
              [theme]="{ 'margin-top': '10px' }"
            ></ngx-skeleton-loader>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class LogsSkeletonComponent {
  repeatCount = new Array(10);
}
