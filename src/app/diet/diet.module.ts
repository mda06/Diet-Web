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
import {PatientFilterPipe} from "../share/PatientFilterPipe";
import { NavbarComponent } from '../navbar/navbar.component';
import { DietComponent } from './diet.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DietRoutingModule,
    SidebarModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    DietDashboardComponent,
    DetailPatientComponent,
    SelectPatientComponent,
    PatientFilterPipe,
    NavbarComponent,
    DietComponent
  ],
  providers: [ DietService, DietGuardServiceService, SharedService ]
})
export class DietModule {}
