import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UtilityComponent } from './utility.component';
import { UserDivisionComponent } from './user-division/user-division.component';
import { UtilityFocalComponent } from './utility-focal/utility-focal.component';
import { OverviewComponent } from './overview/overview.component';
const routes: Routes = [
  {
    path:'',
    component: UtilityComponent,
    children:[
      {
        path: 'user-division',
        component: UserDivisionComponent,
      },
      {
        path: 'utility-focal',
        component: UtilityFocalComponent,
      },
      {
        path: 'overview',
        component: OverviewComponent,
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UtilityRoutingModule { }
