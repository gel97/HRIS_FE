

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TicketComponent } from './ticket.component';
import { UserTicketComponent } from './user-ticket/user-ticket.component';
const routes: Routes = [
  {
    path: '',
    component: TicketComponent,
    children: [
      {
        path: 'user-tickets',
        component: UserTicketComponent,
      },
    
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TicketRoutingModule {}
