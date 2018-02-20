import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PatientComponent} from "./patient.component";
import {PatientGuardServiceService} from "../guard/patient-guard-service.service";
import {PatientDashboardComponent} from "./patient-dashboard/patient-dashboard.component";
import {MenuComponent} from './menu/menu.component';

const ROUTES: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [PatientGuardServiceService],
    children: [
      {path: '', component: PatientDashboardComponent, canActivate: [PatientGuardServiceService]},
      {path: 'dashboard', component: PatientDashboardComponent, canActivate: [PatientGuardServiceService]},
      {path: 'menu', component: MenuComponent, canActivate: [PatientGuardServiceService]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class PatientRoutingModule { }
