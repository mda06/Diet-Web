import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { BasicComponent } from './basic/basic.component';
import {ReportsRoutingModule} from "./reports-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule
  ],
  declarations: [ReportsComponent, BasicComponent]
})
export class ReportsModule { }
