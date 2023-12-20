import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MfoComponent } from './pages/mfo/mfo.component';
import { DpcrComponent } from './pages/dpcr/dpcr.component';
import { OpcrActualComponent } from './pages/opcr/opcr-actual/opcr-actual.component';
import { OpcrTargetComponent } from './pages/opcr/opcr-target/opcr-target.component';
import { SpmsRoutingModule } from './spms-routing.module';
import { SpmsComponent } from './spms.component';
import { SpinnerComponent } from './components/spinner.component';
import { LinearLoadingComponent } from './components/linear-loading/linear-loading.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UtilityComponent } from './pages/utility/utility.component';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OpcrActualSkeletonComponent } from './pages/opcr/opcr-actual/components/opcr-actual-skeleton.component';
import { OpcrTargetSkeletonComponent } from './pages/opcr/opcr-target/components/opcr-target-skeleton.component';
import { IpcrTargetSkeletonComponent } from './pages/ipcr/ipcr-target/components/ipcr-target-skeleton.component';
import { IpcrTargetComponent } from './pages/ipcr/ipcr-target/ipcr-target.component';
import { IpcrActualComponent } from './pages/ipcr/ipcr-actual/ipcr-actual.component';
import { OtsComponent } from './pages/ots/ots.component';
import { LogsComponent } from './pages/logs/logs.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewIpcrComponent } from './pages/ipcr/ipcr-actual/components/view-ipcr.component';
import { HeaderIpcrActualComponent } from './pages/ipcr/ipcr-actual/components/header-ipcr-actual.component';
import { ViewIpcrDataActualComponent } from './pages/ipcr/ipcr-actual/components/view-ipcr-data-actual.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [
    SpmsComponent,
    MfoComponent,
    OpcrActualComponent,
    OpcrTargetComponent,
    DpcrComponent,
    ///SpinnerComponent,
    LinearLoadingComponent,
    OpcrActualSkeletonComponent,
    OpcrTargetSkeletonComponent,
    IpcrTargetSkeletonComponent,
    IpcrTargetComponent,
    IpcrActualComponent,
    OtsComponent,
    UtilityComponent,
    LogsComponent,
    ViewIpcrComponent,
    HeaderIpcrActualComponent,
    ViewIpcrDataActualComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SpmsRoutingModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
  ],
})
export class SpmsModule {}
