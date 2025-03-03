import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { FormsModule } from '@angular/forms';
import { AttendaceRoutingModule } from './attendance-routing.module';
@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AttendaceRoutingModule,
  ]
})
export class AttendaceModule { }
