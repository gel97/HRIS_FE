import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OfficeComponent } from './pages/mfo/office/office.component';
import { OpcrActualComponent } from './pages/opcr/opcr-actual/opcr-actual.component';
import { OpcrTargetComponent } from './pages/opcr/opcr-target/opcr-target.component';
import { SpmsRoutingModule } from './spms-routing.module';
import { SpmsComponent } from './spms.component';
import { SpinnerComponent } from './components/spinner.component';
import { LinearLoadingComponent } from './components/linear-loading/linear-loading.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    SpmsComponent,
    OfficeComponent,
    OpcrActualComponent,
    OpcrTargetComponent,
    SpinnerComponent,
    LinearLoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SpmsRoutingModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MatTooltipModule
  ]
})
export class SpmsModule { }
