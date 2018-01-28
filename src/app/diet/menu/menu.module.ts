import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MenuRoutingModule} from "./menu-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MenuRoutingModule
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
