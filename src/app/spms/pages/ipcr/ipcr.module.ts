import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IpcrRoutingModule } from './ipcr-routing.module';
import { IpcrTargetComponent } from './v2/ipcr-target/ipcr-target.component';
import { HeaderTargetComponent } from './v2/ipcr-target/components/header-target.component';
import { SharedModule } from 'src/app/shared.module';
import { TableIpcrComponent } from './v2/ipcr-target/components/table-ipcr.component';
import { TableIpcrDataComponent } from './v2/ipcr-target/components/table-ipcr-data.component';
import { CanvasTargetMfoesComponent } from './v2/ipcr-target/components/canvas-target-mfoes.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ModalAddMfoComponent } from './v2/ipcr-target/components/modal-add-mfo.component';
import { ModalAddSubtaskComponent } from './v2/ipcr-target/components/modal-add-subtask.component';
import { ModalEditMfoComponent } from './v2/ipcr-target/components/modal-edit-mfo.component';
import { ModalEditSubtaskComponent } from './v2/ipcr-target/components/modal-edit-subtask.component';
import { SkeletonLoadingComponent } from './v2/ipcr-target/components/skeleton-loading.component';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    IpcrTargetComponent,
    HeaderTargetComponent,
    TableIpcrComponent,
    TableIpcrDataComponent,
    CanvasTargetMfoesComponent,
    ModalAddMfoComponent,
    ModalAddSubtaskComponent,
    ModalEditMfoComponent,
    ModalEditSubtaskComponent,
    SkeletonLoadingComponent
  ],
  imports: [
    CommonModule,
    IpcrRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,

  ],
})
export class IpcrModule { }
