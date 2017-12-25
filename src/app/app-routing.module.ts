import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectPatientComponent} from './diet/select-patient/select-patient.component';
import { AuthGuardServiceService } from "./guard/auth-guard-service.service";

import { DietDashboardComponent } from "./diet/diet-dashboard/diet-dashboard.component";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";
import {PatientDashboardComponent} from "./patient/patient-dashboard/patient-dashboard.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'diet/dashboard', component: DietDashboardComponent, canActivate: [AuthGuardServiceService]},
  {path: 'diet/select-patient', component: SelectPatientComponent, canActivate: [AuthGuardServiceService]},
  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardServiceService]},
  {path: 'patient/dashboard', component: PatientDashboardComponent, canActivate: [AuthGuardServiceService]},
  {path: '**', redirectTo:"/login"}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
