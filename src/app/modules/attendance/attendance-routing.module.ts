import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance.component';

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    children: [
      {
        path:'dtr',
        loadChildren: () => import('./pages/DTR/dtr.module')
        .then(m => m.DTRModule),
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})

export class AttendaceRoutingModule { }
