import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService} from "./services/authentication.service";
import { AuthGuardServiceService } from './guard/auth-guard-service.service';
import { SelectPatientComponent } from './diet/select-patient/select-patient.component';
import { DashboardComponent } from './diet/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectPatientComponent,
    DashboardComponent,
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
  providers: [JwtHelperService, AuthenticationService, AuthGuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
