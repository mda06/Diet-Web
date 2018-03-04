import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectPatientComponent} from './select-patient/select-patient.component';
import { DietGuardServiceService } from "../guard/diet-guard-service.service";
import {DetailPatientComponent} from "./detail-patient/detail-patient.component";
import {DietComponent} from "./diet.component";
import {FoodModule} from "./food/food.module";
import {MenuModule} from "./menu/menu.module";
import {DashboardHomeComponent} from "./dashboards/home/dashboard-home.component";

export function getFoodModule() {
  return FoodModule;
}

export function getMenuModule() {
  return MenuModule;
}

const dietRoutes: Routes = [
  {
    path: 'diet',
    component: DietComponent,
    canActivate: [DietGuardServiceService],
    children: [
      {path: '', component: DashboardHomeComponent, canActivate: [DietGuardServiceService]},
      {path: 'dashboard', component: DashboardHomeComponent, canActivate: [DietGuardServiceService]},
      {path: 'select-patient', component: SelectPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'detail-patient', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'add-patient', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'food', loadChildren: getFoodModule},
      {path: 'menu', loadChildren: getMenuModule}
    ]
  }
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
