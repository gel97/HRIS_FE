import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtsRoutingModule } from './ots-routing.module';
import { MainComponent } from './main/main.component';
import { SchedulerComponent } from './main/components/scheduler.component';
import { DxSchedulerModule } from 'devextreme-angular/ui/scheduler';
import { DxPopupModule, DxScrollViewModule, DxSelectBoxModule } from "devextreme-angular";

@NgModule({
  declarations: [ 
    MainComponent,
    SchedulerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OtsRoutingModule,
    DxSchedulerModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSelectBoxModule
  ]
})
export class OtsModule { }
