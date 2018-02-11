import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService} from "./services/authentication.service";
import { PatientGuardServiceService } from "./guard/patient-guard-service.service";
import { PatientDashboardComponent } from "./patient/patient-dashboard/patient-dashboard.component";
import {DateInterceptor} from "./share/DateInterceptor";
import {DietModule} from "./diet/diet.module";
import {AdminModule} from "./admin/admin.module";
import {LoginModule} from './login/login.module';
import {CustomerModule} from "./customer/customer.module";

@NgModule({
  declarations: [
    AppComponent,
    PatientDashboardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({config: {
      tokenGetter: getToken,
      whitelistedDomains: ['localhost:8080']
    }}),
    LoginModule,
    DietModule,
    AdminModule,
    CustomerModule,
    AppRoutingModule
  ],
  providers: [
    JwtHelperService,
    AuthenticationService,
    PatientGuardServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function getToken() {
  return localStorage.getItem('token.access_token');
}
