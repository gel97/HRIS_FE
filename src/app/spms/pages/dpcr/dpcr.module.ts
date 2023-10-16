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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

import { StepperSubtaskComponent } from './dpcr-target/components/stepper-subtask.component';
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
    StepperSubtaskComponent
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
    MatRadioModule
    
  ]
})
export class DpcrModule { }
