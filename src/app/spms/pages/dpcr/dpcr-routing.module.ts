import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DpcrComponent } from './dpcr.component';
import { DpcrTargetComponent } from './dpcr-target/dpcr-target.component';
import { DpcrActualComponent } from './dpcr-actual/dpcr-actual.component';
import { DivisionMfoComponent } from './division-mfo/division-mfo.component';
import { OtsRequestComponent } from './ots-request/ots-request/ots-request.component';
import { EmployeeRatingComponent } from './employee-rating/employee-rating.component';
const routes: Routes = [
  {
    path:'',
    component: DpcrComponent,
    children:[
      {
        path: 'division-mfo',
        component: DivisionMfoComponent,
      },
      {
        path: 'target',
        component: DpcrTargetComponent,
      },
      {
        path: 'actual',
        component: DpcrActualComponent,
      },
      {
        path: 'ots-request',
        component: OtsRequestComponent,
      },
      {
        path: 'employee/rating',
        component: EmployeeRatingComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DpcrRoutingModule { }
