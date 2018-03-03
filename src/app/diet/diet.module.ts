import { NgModule }       from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {SidebarModule} from "ng-sidebar";

import {DietService} from "./service/diet.service";
import {SharedService} from "./service/shared.service";
import {DetailPatientComponent} from "./detail-patient/detail-patient.component";
import {DietDashboardComponent} from "./diet-dashboard/diet-dashboard.component";
import {SelectPatientComponent} from "./select-patient/select-patient.component";
import {DietGuardServiceService} from "../guard/diet-guard-service.service";
import {DietRoutingModule} from "./diet-routing.module";
import { DietComponent } from './diet.component';
import { ChartsModule } from 'ng2-charts';
import {NavbarModule} from "../navbar/navbar.module";
import {FoodModule} from "./food/food.module";
import {MenuModule} from "./menu/menu.module";
import {CustomerModule} from "../customer/customer.module";
import {DashboardItemComponent} from '../dashboard/dashboard-item/dashboard-item.component';
import { PatientInfoComponent } from './dashboards/patient-info/patient-info.component';
import { FoodInfoComponent } from './dashboards/food-info/food-info.component';
import { FoodSliderComponent } from './dashboards/food-slider/food-slider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DietRoutingModule,
    SidebarModule.forRoot(),
    ChartsModule,
    NavbarModule,
    FoodModule,
    MenuModule,
    CustomerModule
  ],
  declarations: [
    DietDashboardComponent,
    DetailPatientComponent,
    SelectPatientComponent,
    DietComponent,
    PatientInfoComponent,
    FoodInfoComponent,
    FoodSliderComponent
  ],
  providers: [ DietService, DietGuardServiceService, SharedService ],
  exports: []
})
export class DietModule {}
