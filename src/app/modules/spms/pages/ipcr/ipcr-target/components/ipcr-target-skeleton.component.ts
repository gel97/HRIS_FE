import { Component } from '@angular/core';

@Component({
  selector: `app-ipcr-target-skeleton`,
  template: `<div class="card p-4">
    <div class="row">
      <!-- HEADER -->
      <!-- <div class="col-1">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-1">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-9"></div>
      <div class="col-1 ">
        <ngx-skeleton-loader
          class="float-end"
          animation="pulse"
          count="1"
          appearance="circle"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-1">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-1">
        <ngx-skeleton-loader
          count="1"
          animation="pulse"
          appearance="line"
        ></ngx-skeleton-loader>
      </div> -->

      <div class="col-12"></div>
      <!-- BODY -->
      <div class="col-1">
        <ngx-skeleton-loader
          count="10"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-7">
        <ngx-skeleton-loader
          count="10"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-3">
        <ngx-skeleton-loader
          count="10"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <div class="col-1">
        <ngx-skeleton-loader
          count="10"
          animation="pulse"
          appearance="line"
          [theme]="{ 'margin-top': '10px' }"
        ></ngx-skeleton-loader>
      </div>
    </div>
  </div>`,
})
export class IpcrTargetSkeletonComponent {}
