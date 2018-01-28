import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DietGuardServiceService} from "../../guard/diet-guard-service.service";
import {MenuComponent} from "./menu.component";

const ROUTES: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [DietGuardServiceService],
    /*children: [
      {path: '', component: DietDashboardComponent, canActivate: [DietGuardServiceService]},
      {path: 'dashboard', component: DietDashboardComponent, canActivate: [DietGuardServiceService]},
      {path: 'select-patient', component: SelectPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'detail-patient', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'detail-patient/:id', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'add-patient', component: DetailPatientComponent, canActivate: [DietGuardServiceService]},
      {path: 'food', loadChildren: getFoodModule}
    ]*/
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
export class MenuRoutingModule { }
