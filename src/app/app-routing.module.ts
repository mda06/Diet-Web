import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectPatientComponent} from './diet/select-patient/select-patient.component';
import { AuthGuardServiceService } from "./guard/auth-guard-service.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'diet/select-patient', component: SelectPatientComponent, canActivate: [AuthGuardServiceService]}/*,
  {path: '**', redirectTo:"/login"}*/
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
