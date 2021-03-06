import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DietGuardServiceService} from "../../guard/diet-guard-service.service";
import {MenuComponent} from "./menu.component";
import {MainComponent} from "./main/main.component";
import {TemplateComponent} from './meal/template/template.component';

const ROUTES: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [DietGuardServiceService],
    children: [
      {path: '', component: MainComponent, canActivate: [DietGuardServiceService]},
      {path: 'template', component: TemplateComponent, canActivate: [DietGuardServiceService]}
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
export class MenuRoutingModule { }
