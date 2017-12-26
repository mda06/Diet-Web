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
import { DietGuardServiceService } from "./guard/diet-guard-service.service";
import { PatientGuardServiceService } from "./guard/patient-guard-service.service";
import { AdminGuardServiceService } from "./guard/admin-guard-service.service";
import { DietService } from "./services/diet.service";
import { SelectPatientComponent } from './diet/select-patient/select-patient.component';
import { DietDashboardComponent } from "./diet/diet-dashboard/diet-dashboard.component";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { PatientDashboardComponent } from "./patient/patient-dashboard/patient-dashboard.component";
import { LoginComponent } from './login/login.component';
import { DetailPatientComponent } from './diet/detail-patient/detail-patient.component';
import {DateInterceptor} from "./share/DateInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectPatientComponent,
    DietDashboardComponent,
    AdminDashboardComponent,
    PatientDashboardComponent,
    DetailPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({config: {
      tokenGetter: () => {
        return localStorage.getItem('token.access_token');
      },
      whitelistedDomains: ['localhost:8080']
    }})
  ],
  providers: [
    JwtHelperService,
    AuthenticationService,
    AdminGuardServiceService,
    DietGuardServiceService,
    PatientGuardServiceService,
    DietService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
