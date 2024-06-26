import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MfoComponent } from './mfo.component';
import { OfficeComponent } from './office/office.component';
const routes: Routes = [{
  path: '',
  component: MfoComponent,
  children: [
    {
      path: 'office',
      component: OfficeComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MfoRoutingModule { }