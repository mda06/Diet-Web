import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientDashboardComponent } from "./patient/patient-dashboard/patient-dashboard.component";

import { PatientGuardServiceService } from "./guard/patient-guard-service.service";

const routes: Routes = [
  {path: 'patient/dashboard', component: PatientDashboardComponent, canActivate: [PatientGuardServiceService]},
  {path: '**', redirectTo:"/login"}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {enableTracing: false}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
