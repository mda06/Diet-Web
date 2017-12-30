import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { PatientDashboardComponent } from "./patient/patient-dashboard/patient-dashboard.component";

import { PatientGuardServiceService } from "./guard/patient-guard-service.service";
import { AdminGuardServiceService } from "./guard/admin-guard-service.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuardServiceService]},
  {path: 'patient/dashboard', component: PatientDashboardComponent, canActivate: [PatientGuardServiceService]},
  {path: '', redirectTo:"/login"},
  {path: '**', redirectTo:"/login"}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, {enableTracing: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
