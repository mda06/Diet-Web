import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MenuRoutingModule} from "./menu-routing.module";
import {MenuService} from "./service/menu.service";
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MenuRoutingModule
  ],
  declarations: [MenuComponent, MainComponent],
  providers: [MenuService]
})
export class MenuModule { }
