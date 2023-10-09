import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DpcrRoutingModule } from './dpcr-routing.module';
import { DpcrTargetComponent } from './dpcr-target/dpcr-target.component';
import { DpcrActualComponent } from './dpcr-actual/dpcr-actual.component';

@NgModule({
  declarations: [
    DpcrTargetComponent,
    DpcrActualComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DpcrRoutingModule
  ]
})
export class DpcrModule { }
