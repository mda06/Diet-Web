import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {Menu} from "../../../model/menu";
import {Product} from "../../../model/product";
import {FoodService} from "../../food/service/food.service";
import {TranslateService} from "@ngx-translate/core";
import {DietService} from "../../service/diet.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('accordion') accordion;
  selectedMenu: Menu;
  showProducts; boolean = false;

  constructor(private service: MenuService,
              private foodService: FoodService,
              private dietService: DietService,
              public translate: TranslateService) { }

  ngOnInit() {
    this.selectedMenu = new Menu();
    this.service.getMenu(8).subscribe(data => {
      this.selectedMenu = data;
      this.dietService.getPatient(data.patientId).subscribe(data => this.selectedMenu.patient = data);
      this.selectedMenu.meals.forEach(meal => {
        meal.mealProducts.forEach(mp => {
          this.foodService.getProduct(mp.productId, this.translate.currentLang).subscribe(data => {
            mp.product = data;
          });
        });
      });
      }, err => console.log(err)
    );
  }

  onDelete(tmpID: any) {
    //Work's because: static-1 opens -> static-2 closes;
    //After the toggle: static-2 opens because of the click
    //But this won't work if we are static-1
    this.accordion.toggle("static-1");
    console.log(tmpID);
  }

  onEdit(tmpID: any) {
    console.log(tmpID);
  }

  onSelectedProduct(product: Product) {
    console.log("Product selected: ", product.id);
  }

  panelChange(evt: any) {
    console.log(evt);
    this.showProducts = evt.nextState;
  }
}
