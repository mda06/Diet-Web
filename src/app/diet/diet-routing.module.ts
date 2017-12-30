import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DietDashboardComponent} from "./diet-dashboard/diet-dashboard.component";
import { SelectPatientComponent} from './select-patient/select-patient.component';
import { DietGuardServiceService } from "../guard/diet-guard-service.service";
import {DetailPatientComponent} from "./detail-patient/detail-patient.component";

const dietRoutes: Routes = [
  {path: 'diet/dashboard', component: DietDashboardComponent, canActivate: [DietGuardServiceService]},
  {path: 'diet/select-patient', component: SelectPatientComponent, canActivate: [DietGuardServiceService]},
  {path: 'diet/detail-patient/:id', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
];

@NgModule({
  imports: [
    RouterModule.forChild(dietRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DietRoutingModule { }
