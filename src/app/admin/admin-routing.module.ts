import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminGuardServiceService} from "../guard/admin-guard-service.service";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminComponent} from "./admin.component";
import {FoodComponent} from "./food/food.component";
import {SelectDietComponent} from "./select-diet/select-diet.component";
import {DetailDietComponent} from "./detail-diet/detail-diet.component";

const foodRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardServiceService],
    children: [
      {path: '', component: AdminDashboardComponent, canActivate: [AdminGuardServiceService]},
      {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuardServiceService]},
      {path: 'select-diet', component: SelectDietComponent, canActivate: [AdminGuardServiceService]},
      {path: 'detail-diet/:id', component: DetailDietComponent, canActivate: [AdminGuardServiceService]},
      {path: 'add-diet', component: DetailDietComponent, canActivate: [AdminGuardServiceService]},
      {path: 'food', component: FoodComponent, canActivate: [AdminGuardServiceService]},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(foodRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
