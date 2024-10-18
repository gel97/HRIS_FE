

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared.module';
import { IMSRoutingModule } from './ims-routing.module';
import { IMSComponent } from './ims.component';
@NgModule({
  declarations: [
    IMSComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    NgxSkeletonLoaderModule,
    SharedModule,
    IMSRoutingModule
  ],
})
export class IMSModule {}
