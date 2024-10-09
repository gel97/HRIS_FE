
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HealthNWellnessComponent } from './healthNwellness.component';
import { HealthNWellnessRoutingModule } from './healthNwellness-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    HealthNWellnessComponent
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
    HealthNWellnessRoutingModule
  ],
})
export class HealthNWellnessModule {}
