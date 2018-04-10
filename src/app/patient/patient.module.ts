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
import { MenuComponent } from './menu/menu.component';
import {MenuModule} from '../diet/menu/menu.module';
import { MealPictureComponent } from './meal-picture/meal-picture.component';
import {UploadFileService} from '../services/upload-file.service';
import {FileUploadModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PatientRoutingModule,
    SidebarModule.forRoot(),
    NavbarModule,
    MenuModule,
    FileUploadModule
  ],
  declarations: [
    PatientComponent,
    PatientDashboardComponent,
    MenuComponent,
    MealPictureComponent,
  ],
  providers: [
    PatientGuardServiceService,
    UploadFileService
  ]
})
export class PatientModule { }
