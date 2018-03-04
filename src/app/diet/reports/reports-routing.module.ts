import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DietGuardServiceService} from "../../guard/diet-guard-service.service";
import {ReportsComponent} from "./reports.component";
import {BasicComponent} from "./basic/basic.component";

const ROUTES: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canActivate: [DietGuardServiceService],
    children: [
      {path: '', component: BasicComponent, canActivate: [DietGuardServiceService]},
      {path: 'basic', component: BasicComponent, canActivate: [DietGuardServiceService]},
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
export class ReportsRoutingModule { }
