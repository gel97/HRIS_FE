import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserComponent } from './components/user/user.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { SpmsModule } from './modules/spms/spms.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './modules/spms/components/error/error.component';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { DatePipe } from '@angular/common';
import { SharedModule } from './shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordResetComponent } from './guest/password-reset/password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    UserComponent,
    FooterComponent,
    MainlayoutComponent,
    ErrorComponent,
    UserLoginComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpmsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
