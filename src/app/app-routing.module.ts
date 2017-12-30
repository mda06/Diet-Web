import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SelectPatientComponent} from './diet/select-patient/select-patient.component';
import { DietDashboardComponent } from "./diet/diet-dashboard/diet-dashboard.component";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { PatientDashboardComponent } from "./patient/patient-dashboard/patient-dashboard.component";

import { DietGuardServiceService } from "./guard/diet-guard-service.service";
import { PatientGuardServiceService } from "./guard/patient-guard-service.service";
import { AdminGuardServiceService } from "./guard/admin-guard-service.service";
import {DetailPatientComponent} from "./diet/detail-patient/detail-patient.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'diet/dashboard', component: DietDashboardComponent, canActivate: [DietGuardServiceService]},
  {path: 'diet/select-patient', component: SelectPatientComponent, canActivate: [DietGuardServiceService]},
  {path: 'diet/detail-patient/:id', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuardServiceService]},
  {path: 'patient/dashboard', component: PatientDashboardComponent, canActivate: [PatientGuardServiceService]},
  {path: '**', redirectTo:"/login"}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, {enableTracing: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
