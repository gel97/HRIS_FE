import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MfoComponent } from './pages/mfo/mfo.component';
import { DpcrComponent } from './pages/dpcr/dpcr.component';
import { OpcrActualComponent } from './pages/opcr/opcr-actual/opcr-actual.component';
import { OpcrTargetComponent } from './pages/opcr/opcr-target/opcr-target.component';
import { ModalOpcrSignatoriesComponent } from './pages/opcr/opcr-target/components/modal-opcr-signatories.component';
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
import { OpcrActualSkeletonComponent } from './pages/opcr/opcr-actual/components/opcr-actual-skeleton.component';
import { OpcrTargetSkeletonComponent } from './pages/opcr/opcr-target/components/opcr-target-skeleton.component';
import { IpcrTargetSkeletonComponent } from './pages/ipcr/ipcr-target/components/ipcr-target-skeleton.component';
import { LogsSkeletonComponent } from './pages/logs/components/logs-skeleton.component';
import { MfoSkeletonComponent } from './pages/opcr/opcr-target/components/mfo-skeleton.component';
import { IpcrTargetComponent } from './pages/ipcr/ipcr-target/ipcr-target.component';
import { IpcrActualComponent } from './pages/ipcr/ipcr-actual/ipcr-actual.component';
import { OtsComponent } from './pages/ots/ots.component';
import { LogsComponent } from './pages/logs/logs.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewIpcrComponent } from './pages/ipcr/ipcr-actual/components/view-ipcr.component';
import { HeaderIpcrActualComponent } from './pages/ipcr/ipcr-actual/components/header-ipcr-actual.component';
import { ViewIpcrDataActualComponent } from './pages/ipcr/ipcr-actual/components/view-ipcr-data-actual.component';
//import { FirstLetterUppercasePipe } from '../pipe/first-letter-uppercase.pipe';
import { SharedModule } from 'src/app/shared.module';
import { OpcrActualMfoesComponent } from './pages/opcr/opcr-actual/components/opcr-actual-mfoes.component';
import { HeaderOpcrActualComponent } from './pages/opcr/opcr-actual/components/header-opcr-actual.component';
import { ViewOpcrActualComponent } from './pages/opcr/opcr-actual/components/view-opcr-actual.component';
import { ViewOpcrActualDataComponent } from './pages/opcr/opcr-actual/components/view-opcr-actual-data.component';
import { IpcrComponent } from './pages/ipcr/ipcr.component';
import { ModalOpcrFinalReportComponent } from './pages/opcr/opcr-actual/components/modal-opcr-final-report.component';
import { ModalOpcrTargetReportComponent } from './pages/opcr/opcr-target/components/modal-opcr-target-report.component';
import { ModalOpcrStandardReportComponent } from './pages/opcr/opcr-actual/components/modal-opcr-standard-report.component';
@NgModule({
  declarations: [
    SpmsComponent,
    MfoComponent,
    OpcrActualComponent,
    OpcrTargetComponent,
    DpcrComponent,
    LinearLoadingComponent,
    OpcrActualSkeletonComponent,
    OpcrTargetSkeletonComponent,
    IpcrTargetSkeletonComponent,
    LogsSkeletonComponent,
    MfoSkeletonComponent,
    IpcrTargetComponent,
    IpcrActualComponent,
    OtsComponent,
    UtilityComponent,
    LogsComponent,
    ViewIpcrComponent,
    HeaderIpcrActualComponent,
    ViewIpcrDataActualComponent,
    OpcrActualMfoesComponent,
    HeaderOpcrActualComponent,
    ViewOpcrActualComponent,
    ViewOpcrActualDataComponent,
    IpcrComponent,
    ModalOpcrFinalReportComponent,
    ModalOpcrTargetReportComponent,
    ModalOpcrStandardReportComponent,
    ModalOpcrSignatoriesComponent
   // FirstLetterUppercasePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SpmsRoutingModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    SharedModule
  ],
})
export class SpmsModule {}
