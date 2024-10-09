import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
import { MedConRoutingModule } from './medcon-routing.module';
import { MedConComponent } from './medcon.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { PrescriptionComponent } from './prescription/prescription.component';
@NgModule({
  declarations: [
    MedConComponent,
    ConsultationComponent,
    LaboratoryComponent,
    PrescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedConRoutingModule,
    SharedModule
  ]
})
export class MedConModule { }
