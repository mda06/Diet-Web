import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodComponent } from './food.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SidebarModule} from "ng-sidebar";
import {FoodRoutingModule} from "./food-routing.module";
import {DietGuardServiceService} from "../guard/diet-guard-service.service";
import {FoodService} from "./service/food.service";
import { SearchComponent } from './search/search.component';
import {NavbarModule} from "../navbar/navbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FoodRoutingModule,
    SidebarModule.forRoot(),
    NavbarModule
  ],
  declarations: [
    FoodComponent,
    SearchComponent
  ],
  providers: [ FoodService, DietGuardServiceService, ]
})
export class FoodModule { }
