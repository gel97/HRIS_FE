import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpcrRoutingModule } from './dpcr-routing.module';
import { DpcrTargetComponent } from './dpcr-target/dpcr-target.component';
import { DpcrActualComponent } from './dpcr-actual/dpcr-actual.component';
import { HeaderTargetComponent } from './dpcr-target/components/header-target.component';
import { TableDpcrComponent } from './dpcr-target/components/table-dpcr.component';
import { CanvasTargetDpcrComponent } from './dpcr-target/components/canvas-target-dpcr.component';
import { TableDpcrDataComponent } from './dpcr-target/components/table-dpcr-data.component';
import { TableDpcrDataMfoesComponent } from './dpcr-target/components/table-dpcr-data-mfoes.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ModalDpcrDataComponent } from './dpcr-target/components/modal-dpcr-data.component';
import { EmptyDataComponent } from '../../components/empty-data.component';
import { ModalSubTaskComponent } from './dpcr-target/components/modal-sub-task.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { StepperSubtaskComponent } from './dpcr-target/components/stepper-subtask.component';
import { ViewSubtaskComponent } from './dpcr-target/components/view-sub-task.component';
import { ModalEditSubTaskComponent } from './dpcr-target/components/modal-edit-sub-task.component';
import { ModalDpcrDataEditQuantityComponent } from './dpcr-target/components/modal-dpcr-data-edit-quantity.component';
import { CanvasTargetDpcrMfoesComponent } from './dpcr-target/components/canvas-target-mfoes.component';
import { DpcrActualSkeletonComponent } from './dpcr-actual/components/dpcr-actual-skeleton.component';
import { ModalEditSubTaskCmfoComponent } from './dpcr-target/components/modal-edit-sub-task-cmfo.component';
import { DivisionMfoComponent } from './division-mfo/division-mfo.component';
import { TableMfoComponent } from './division-mfo/components/table-mfo.component';
import { CanvasMFOComponent } from './division-mfo/components/canvas-mfo.component';
import { CanvasSIComponent } from './division-mfo/components/canvas-si.component';
import { SearchMFOComponent } from './division-mfo/components/search-mfo.component';
import { OtsRequestComponent } from './ots-request/ots-request/ots-request.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    DpcrTargetComponent,
    DpcrActualComponent,
    HeaderTargetComponent,
    TableDpcrComponent,
    TableDpcrDataComponent,
    TableDpcrDataMfoesComponent,
    CanvasTargetDpcrComponent,
    ModalDpcrDataComponent,
    EmptyDataComponent,
    ModalSubTaskComponent,
    StepperSubtaskComponent,
    ViewSubtaskComponent,
    ModalEditSubTaskComponent,
    ModalDpcrDataEditQuantityComponent,
    CanvasTargetDpcrMfoesComponent,
    DpcrActualSkeletonComponent,
    ModalEditSubTaskCmfoComponent,
    DivisionMfoComponent,
    TableMfoComponent,
    CanvasMFOComponent,
    CanvasSIComponent,
    SearchMFOComponent,
    OtsRequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DpcrRoutingModule,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
})
export class DpcrModule {}
