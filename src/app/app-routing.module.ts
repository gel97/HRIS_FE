import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { AuthGuard } from './auth.guard';
import { PasswordResetComponent } from './guest/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
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
          import('./modules/spms/spms.module').then((m) => m.SpmsModule),
      },
      {
        path: 'health&wellness',
        loadChildren: () =>
          import('./modules/healthNwellness/healthNwellness.module').then((m) => m.HealthNWellnessModule),
      },
      {
        path: 'ims',
        loadChildren: () =>
          import('./modules/ims/ims.module').then((m) => m.IMSModule),
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
