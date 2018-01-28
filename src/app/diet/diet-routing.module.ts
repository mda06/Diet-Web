import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DietDashboardComponent} from "./diet-dashboard/diet-dashboard.component";
import { SelectPatientComponent} from './select-patient/select-patient.component';
import { DietGuardServiceService } from "../guard/diet-guard-service.service";
import {DetailPatientComponent} from "./detail-patient/detail-patient.component";
import {DietComponent} from "./diet.component";
import {SearchComponent} from "./food/search/search.component";
import {FoodModule} from "./food/food.module";

const dietRoutes: Routes = [
  {
    path: 'diet',
    component: DietComponent,
    canActivate: [DietGuardServiceService],
    children: [
      {path: '', component: DietDashboardComponent, canActivate: [DietGuardServiceService]},
      {path: 'dashboard', component: DietDashboardComponent, canActivate: [DietGuardServiceService]},
      {path: 'select-patient', component: SelectPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'detail-patient', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'detail-patient/:id', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'add-patient', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'food', loadChildren: () => FoodModule}
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
