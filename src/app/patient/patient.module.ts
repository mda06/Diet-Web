import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PatientRoutingModule} from "./patient-routing.module";
import {SidebarModule} from "ng-sidebar";
import {NavbarModule} from "../navbar/navbar.module";
import {PatientGuardServiceService} from "../guard/patient-guard-service.service";
import {PatientDashboardComponent} from "./patient-dashboard/patient-dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PatientRoutingModule,
    SidebarModule.forRoot(),
    NavbarModule
  ],
  declarations: [PatientComponent, PatientDashboardComponent],
  providers: [PatientGuardServiceService]
})
export class PatientModule { }
