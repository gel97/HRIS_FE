import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DpcrRoutingModule } from './dpcr-routing.module';
import { DpcrTargetComponent } from './dpcr-target/dpcr-target.component';
import { DpcrActualComponent } from './dpcr-actual/dpcr-actual.component';
import { HeaderTargetComponent } from './dpcr-target/components/header-target.component';
import { TableDpcrComponent } from './dpcr-target/components/table-dpcr.component';
import { CanvasTargetDpcrComponent } from './dpcr-target/components/canvas-target-dpcr.component';
import { TableDpcrDataComponent } from './dpcr-target/components/table-dpcr-data.component';
import { TableDpcrDataMfoesComponent } from './dpcr-target/components/table-dpcr-data-mfoes.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    DpcrTargetComponent,
    DpcrActualComponent,
    HeaderTargetComponent,
    TableDpcrComponent,
    TableDpcrDataComponent,
    TableDpcrDataMfoesComponent,
    CanvasTargetDpcrComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DpcrRoutingModule,
    NgxSkeletonLoaderModule
  ]
})
export class DpcrModule { }
