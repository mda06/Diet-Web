import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FoodComponent} from "./food.component";
import {DietGuardServiceService} from "../../guard/diet-guard-service.service";
import {SearchComponent} from "./search/search.component";
import {HomeComponent} from "./home/home.component";

const foodRoutes: Routes = [
  {
    path: '',
    component: FoodComponent,
    canActivate: [DietGuardServiceService],
    children: [
      {path: '', component: HomeComponent, canActivate: [DietGuardServiceService]},
      {path: 'search', component: SearchComponent, canActivate: [DietGuardServiceService]},
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
export class FoodRoutingModule { }
