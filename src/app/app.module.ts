import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService} from "./services/authentication.service";
import { PatientGuardServiceService } from "./guard/patient-guard-service.service";
import { AdminGuardServiceService } from "./guard/admin-guard-service.service";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { PatientDashboardComponent } from "./patient/patient-dashboard/patient-dashboard.component";
import { LoginComponent } from './login/login.component';
import {DateInterceptor} from "./share/DateInterceptor";
import {DietModule} from "./diet/diet.module";
import { FoodModule } from "./food/food.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    PatientDashboardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({config: {
      tokenGetter: getToken,
      whitelistedDomains: ['localhost:8080']
    }}),
    DietModule,
    FoodModule,
    AppRoutingModule
  ],
  providers: [
    JwtHelperService,
    AuthenticationService,
    AdminGuardServiceService,
    PatientGuardServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getToken() {
  return localStorage.getItem('token.access_token');
}
