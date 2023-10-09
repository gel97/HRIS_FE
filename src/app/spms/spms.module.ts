import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MfoComponent } from './pages/mfo/mfo.component';
import { OfficeComponent } from './pages/mfo/office/office.component';
import { OpcrActualComponent } from './pages/opcr/opcr-actual/opcr-actual.component';
import { OpcrTargetComponent } from './pages/opcr/opcr-target/opcr-target.component';
import { SpmsRoutingModule } from './spms-routing.module';
import { SpmsComponent } from './spms.component';
import { SpinnerComponent } from './components/spinner.component';
import { LinearLoadingComponent } from './components/linear-loading/linear-loading.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import { OpcrActualSkeletonComponent } from './pages/opcr/opcr-actual/components/opcr-actual-skeleton';

@NgModule({
  declarations: [
    SpmsComponent,
    MfoComponent,
    //OfficeComponent,
    OpcrActualComponent,
    OpcrTargetComponent,
    ///SpinnerComponent,
    LinearLoadingComponent,
    OpcrActualSkeletonComponent,
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
    NgxSkeletonLoaderModule
  ]
})
export class SpmsModule { }
