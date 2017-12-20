import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [LoginService, AuthGuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
