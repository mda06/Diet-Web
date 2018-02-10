import { Component, OnInit } from '@angular/core';
import {Meal} from '../../../../model/meal';
import {MenuService} from '../../service/menu.service';
import {AuthenticationService} from '../../../../services/authentication.service';
import {TranslateService} from "@ngx-translate/core";
import {FoodService} from "../../../food/service/food.service";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  templateMeals: Array<Meal> = [];

  constructor(private service: MenuService,
              private authService: AuthenticationService,
              private foodService: FoodService,
              public translate: TranslateService) { }

  ngOnInit() {
    this.authService.id.subscribe(id => {
      this.service.getMealByDietId(id).subscribe(data => {
        this.templateMeals = data;
        this.templateMeals.forEach(meal => {
          meal.mealProducts.forEach(mp => {
            this.foodService.getProduct(mp.productId, this.translate.currentLang).subscribe(data => {
              mp.product = data;
            });
          });
        });
      }, err => console.log(err));
    });
  }

}
