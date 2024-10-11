import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedConComponent } from './medcon.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { PrescriptionComponent } from './prescription/prescription.component';
const routes: Routes = [
  {
    path:'',
    component: MedConComponent,
    children:[
      {
        path: 'consultation',
        component: ConsultationComponent,
      },
      {
        path: 'laboratory',
        component: LaboratoryComponent,
      },
      {
        path: 'prescription',
        component: PrescriptionComponent,
      },
    
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedConRoutingModule { }
