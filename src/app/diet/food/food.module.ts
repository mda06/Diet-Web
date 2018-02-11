import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodComponent } from './food.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FoodRoutingModule} from "./food-routing.module";
import {DietGuardServiceService} from "../../guard/diet-guard-service.service";
import {FoodService} from "./service/food.service";
import {SearchComponent} from './search/search.component';
import {NavbarModule} from "../../navbar/navbar.module";
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FoodRoutingModule,
    NavbarModule
  ],
  declarations: [
    FoodComponent,
    SearchComponent,
    DetailComponent,
    HomeComponent
  ],
  exports: [
    FoodComponent,
    SearchComponent
  ],
  providers: [ FoodService, DietGuardServiceService]
})
export class FoodModule { }
