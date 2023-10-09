import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from './pages/mfo/office/office.component';
import { OpcrActualComponent } from './pages/opcr/opcr-actual/opcr-actual.component';
import { OpcrTargetComponent } from './pages/opcr/opcr-target/opcr-target.component';
import { SpmsComponent } from './spms.component';

const routes: Routes = [
  {
    path: '',
    component: SpmsComponent,
    children: [
      {
        path: 'mfo',
        loadChildren: () => import('./pages/mfo/mfo.module')
        .then(m => m.MfoModule),
      },
      {
        path: 'opcr/target',
        component: OpcrTargetComponent,
      },
      {
        path: 'opcr/actual',
        component: OpcrActualComponent,
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SpmsRoutingModule {}
