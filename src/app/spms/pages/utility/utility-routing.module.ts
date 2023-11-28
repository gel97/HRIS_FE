import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilityComponent } from './utility.component';
import { UtilityFocalComponent } from './utility-focal/utility-focal.component';
const routes: Routes = [{
    path: '',
    component: UtilityComponent,
    children: [
      {
        path: 'utility-focal',
        component: UtilityFocalComponent,
      },
    ],
  }];
  


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UtilityRoutingModule { }