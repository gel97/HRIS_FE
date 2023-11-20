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
import { SpmsModule } from './spms/spms.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './spms/components/error/error.component';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UserLoginComponent } from './login/user-login/user-login.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpmsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
