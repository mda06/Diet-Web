import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SidebarModule} from "ng-sidebar";
import {NavbarModule} from "../navbar/navbar.module";
import {AdminGuardServiceService} from "../guard/admin-guard-service.service";
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {FoodService} from "../food/service/food.service";
import {AdminService} from "./service/admin.service";
import { FoodComponent } from './food/food.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AdminRoutingModule,
    SidebarModule.forRoot(),
    NavbarModule
  ],
  declarations: [AdminComponent, AdminDashboardComponent, FoodComponent],
  providers: [ AdminGuardServiceService, FoodService, AdminService]
})
export class AdminModule { }
