

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IMSComponent } from './ims.component';
const routes: Routes = [
  {
    path: '',
    component: IMSComponent,
    children: [
      {
        path: 'ticket',
        loadChildren: () =>
        import('./pages/ticket/ticket.module').then((m) => m.TicketModule),
      },
    
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class IMSRoutingModule {}
