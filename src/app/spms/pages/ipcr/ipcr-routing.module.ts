import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpcrComponent } from './ipcr.component';
import { IpcrTargetComponent } from './v2/ipcr-target/ipcr-target.component';
const routes: Routes = [
  {
    path:'',
    component: IpcrComponent,
    children:[
        {
            path: 'target',
            component: IpcrTargetComponent,
        },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IpcrRoutingModule { }
