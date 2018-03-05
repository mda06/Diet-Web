import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SidebarModule} from "ng-sidebar";
import {NavbarModule} from "../navbar/navbar.module";
import {AdminGuardServiceService} from "../guard/admin-guard-service.service";
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import {FoodService} from "../diet/food/service/food.service";
import {AdminService} from "./service/admin.service";
import { FoodComponent } from './food/food.component';
import { SelectDietComponent } from './select-diet/select-diet.component';
import {CustomerModule} from "../customer/customer.module";
import { DetailDietComponent } from './detail-diet/detail-diet.component';
import { HomeComponent } from './dashboards/home/home.component';
import { ProductsInfoComponent } from './dashboards/products-info/products-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AdminRoutingModule,
    SidebarModule.forRoot(),
    NavbarModule,
    CustomerModule
  ],
  entryComponents: [ProductsInfoComponent],
  declarations: [AdminComponent, FoodComponent, SelectDietComponent, DetailDietComponent, HomeComponent, ProductsInfoComponent],
  providers: [ AdminGuardServiceService, FoodService, AdminService]
})
export class AdminModule { }
