
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HealthNWellnessComponent } from './healthNwellness.component';
const routes: Routes = [
  {
    path: '',
    component: HealthNWellnessComponent,
    children: [
      {
        path: 'medcon',
        loadChildren: () =>
        import('./pages/medcon/medcon.module').then((m) => m.MedConModule),
      },
    
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class HealthNWellnessRoutingModule {}
