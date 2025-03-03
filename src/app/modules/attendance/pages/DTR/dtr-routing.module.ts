import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DTRComponent } from './dtr.component';
import { PreparationComponent } from './preparation/preparation.component';
const routes: Routes = [
  {
    path: '',
    component: DTRComponent,
    children: [
      {
        path: 'preparation',
        component: PreparationComponent,
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})

export class DTRRoutingModule { }
