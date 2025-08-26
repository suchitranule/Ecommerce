import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutService } from './layout-service';

import { App } from './app';
import { Login } from './login/login';
import { Registration } from './registration/registration';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { AppHttpInterceptor } from './core/interceptor/http-interceptor';
import { LoadSpinnerService } from './core/shared/service/load-spinner';
import { LoadSpinner } from './core/shared/component/load-spinner/load-spinner';

@NgModule({
  declarations: [
    App,
    Login,
    Registration,
    Header,
    Sidebar,
    LoadSpinner
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    provideBrowserGlobalErrorListeners(),
    LayoutService,
    LoadSpinnerService
  ],
  bootstrap: [App]
})
export class AppModule { }
