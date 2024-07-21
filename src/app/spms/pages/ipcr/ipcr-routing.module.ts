import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpcrComponent } from './ipcr.component';
import { IpcrTargetComponent } from './v2/ipcr-target/ipcr-target.component';
import { ViewIpcrSignatoryComponent } from './v2/ipcr-target/components/view-ipcr-signatory.component';
const routes: Routes = [
  {
    path:'',
    component: IpcrComponent,
    children:[
        {
            path: 'target',
            component: IpcrTargetComponent,
        },
        {
          path: 'signatory/:ipcrId',
          component: ViewIpcrSignatoryComponent,
        },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IpcrRoutingModule { }
