import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'user-login',
    component: UserLoginComponent,
  },
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'spms',
        loadChildren: () =>
          import('./spms/spms.module').then((m) => m.SpmsModule),
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'sample',
        component: UserComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
