import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from './pages/mfo/office/office.component';
import { OpcrActualComponent } from './pages/opcr/opcr-actual/opcr-actual.component';
import { OpcrTargetComponent } from './pages/opcr/opcr-target/opcr-target.component';
import { SpmsComponent } from './spms.component';
import { IpcrTargetComponent } from './pages/ipcr/ipcr-target/ipcr-target.component';
import { IpcrActualComponent } from './pages/ipcr/ipcr-actual/ipcr-actual.component';
import { LogsComponent } from './pages/logs/logs.component';
const routes: Routes = [
  {
    path: '',
    component: SpmsComponent,
    children: [
      {
        path: 'mfo',
        loadChildren: () =>
          import('./pages/mfo/mfo.module').then((m) => m.MfoModule),
      },
      {
        path: 'opcr/target',
        component: OpcrTargetComponent,
      },
      {
        path: 'opcr/actual',
        component: OpcrActualComponent,
      },
      {
        path: 'ipcr/v1/target',
        component: IpcrTargetComponent,
      },
      {
        path: 'ipcr/actual',
        component: IpcrActualComponent,
      },
      {
        path: 'logs',
        component: LogsComponent
      },
      {
        path:'dpcr',
        loadChildren: () => import('./pages/dpcr/dpcr.module')
        .then(m => m.DpcrModule),
      },
      {
        path:'ots',
        loadChildren: () => import('./pages/ots/ots.module')
        .then(m => m.OtsModule),
      },
      {
        path:'utility',
        loadChildren: () => import('./pages/utility/utility.module')
        .then(m => m.UtilityModule),
      },
      {
        path:'ipcr',
        loadChildren: () => import('./pages/ipcr/ipcr.module')
        .then(m => m.IpcrModule),
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SpmsRoutingModule {}
