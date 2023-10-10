import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfficeComponent } from './office/office.component';
import { SpinnerComponent } from '../../components/spinner.component';
import { MfoRoutingModule } from './mfo-routing.module';
import { ToggleMfoComponent } from './office/components/toggle-mfo.component';
import { TableMfoComponent } from './office/components/table-mfo.component';
import { CanvasSIComponent } from './office/components/canvas-si.component';
import { CanvasMFOComponent } from './office/components/canvas-mfo.component';
import { SearchMFOComponent } from './office/components/search-mfo.component';
@NgModule({
  declarations: [
    OfficeComponent,
    ToggleMfoComponent,
    SpinnerComponent,
    TableMfoComponent,
    CanvasMFOComponent,
    CanvasSIComponent,
    SearchMFOComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MfoRoutingModule
  ]
})
export class MfoModule { }
