import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtsRoutingModule } from './ots-routing.module';
import { MainComponent } from './main/main.component';
import { SchedulerComponent } from './main/components/scheduler.component';
import { DxSchedulerModule } from 'devextreme-angular/ui/scheduler';
import { DxPopupModule, DxScrollViewModule, DxSelectBoxModule } from "devextreme-angular";
import { TableOtsComponent } from './main/components/table-ots.component';
import { TableMfoesComponent } from './main/components/table-mfoes.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TableMonthComponent } from './main/components/table-month.component';
import { WarningComponent } from "../../components/warning.component";
import { TruncatePipe } from 'src/app/pipe/truncate.pipe';
import { ModalOtsEditComponent } from './main/components/modal-ots-edit.component';
import { SharedModule } from 'src/app/shared.module';
@NgModule({
    declarations: [
        MainComponent,
        SchedulerComponent,
        TableOtsComponent,
        TableMfoesComponent,
        TableMonthComponent,
        TruncatePipe,
        ModalOtsEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OtsRoutingModule,
        DxSchedulerModule,
        DxPopupModule,
        DxScrollViewModule,
        DxSelectBoxModule,
        NgxSkeletonLoaderModule,
        WarningComponent,
        SharedModule
    ]
})
export class OtsModule { }
