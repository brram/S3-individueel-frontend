import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishComponent } from './components/dish/dish.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { SettingComponent } from './components/setting/setting.component';
import { SettingGeneralComponent } from './components/setting-general/setting-general.component';
import { SettingInfoComponent } from './components/setting-info/setting-info.component';
import { SettingLinksComponent } from './components/setting-links/setting-links.component';
import { SettingConnectionsComponent } from './components/setting-connections/setting-connections.component';
import { SettingNotificationsComponent } from './components/setting-notifications/setting-notifications.component';
import { SettingAutomationComponent } from './components/setting-automation/setting-automation.component';
import { SettingChangepasswordComponent } from './components/setting-changepassword/setting-changepassword.component';
import { MenuComponent } from './components/menu/menu.component';
import { PaymentComponent } from './components/payment/payment.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    IngredientComponent,
    SettingComponent,
    SettingGeneralComponent,
    SettingInfoComponent,
    SettingLinksComponent,
    SettingConnectionsComponent,
    SettingNotificationsComponent,
    SettingAutomationComponent,
    SettingChangepasswordComponent,
    MenuComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
