import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MenuRoutingModule} from "./menu-routing.module";
import {MenuService} from "./service/menu.service";
import { MainComponent } from './main/main.component';
import {FoodModule} from "../food/food.module";
import {TimesPipe} from "../../share/TimesPipe";
import {NavbarModule} from "../../navbar/navbar.module";
import {NgDragDropModule} from "ng-drag-drop";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MenuRoutingModule,
    FoodModule,
    NgDragDropModule.forRoot()
  ],
  declarations: [MenuComponent, MainComponent, TimesPipe],
  providers: [MenuService]
})
export class MenuModule { }
