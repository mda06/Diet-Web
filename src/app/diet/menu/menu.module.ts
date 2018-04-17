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
import {MealComponent} from './meal/meal.component';
import { TemplateComponent } from './meal/template/template.component';
import { MealPictureComponent } from './meal-picture/meal-picture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MenuRoutingModule,
    FoodModule,
    NavbarModule
  ],
  declarations: [
    MenuComponent,
    MealComponent,
    MainComponent,
    TimesPipe,
    TemplateComponent,
    MealPictureComponent
  ],
  providers: [MenuService],
  exports: [MainComponent]
})
export class MenuModule { }
