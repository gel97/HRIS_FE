import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DTRRoutingModule } from './dtr-routing.module';
import { DTRComponent } from './dtr.component';
import { PreparationComponent } from './preparation/preparation.component';

@NgModule({
  declarations: [
    DTRComponent,
    PreparationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DTRRoutingModule
  ]
})
export class DTRModule { }
