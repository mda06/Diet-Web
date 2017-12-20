import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DietSelectPatientComponent } from './diet-select-patient/diet-select-patient.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginService} from './login/login.service';
import { AuthGuardServiceService } from './guard/auth-guard-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DietSelectPatientComponent,
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
  providers: [JwtHelperService, LoginService, AuthGuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
