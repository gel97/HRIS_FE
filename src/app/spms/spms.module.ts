import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OfficeComponent } from './pages/mfo/office/office.component';
import { OpcrActualComponent } from './pages/opcr/opcr-actual/opcr-actual.component';
import { OpcrTargetComponent } from './pages/opcr/opcr-target/opcr-target.component';
import { SpmsRoutingModule } from './spms-routing.module';
import { SpmsComponent } from './spms.component';
@NgModule({
  declarations: [
    SpmsComponent,
    OfficeComponent,
    OpcrActualComponent,
    OpcrTargetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SpmsRoutingModule
  ]
})
export class SpmsModule { }
