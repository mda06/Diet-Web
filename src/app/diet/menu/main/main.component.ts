import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {Menu} from "../../../model/menu";
import {Product} from "../../../model/product";
import {FoodService} from "../../food/service/food.service";
import {TranslateService} from "@ngx-translate/core";
import {DietService} from "../../service/diet.service";
import * as moment from 'moment';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateNativeAdapter} from "../../../share/NgbDateNativeAdapter";
import {Meal} from "../../../model/meal";
import {EuropeanNgbDateParserFormatter} from "../../../share/EuropeanNgbDateParserFormatter";
import {NgbDatepickerNavigateEvent} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    {provide: NgbDateParserFormatter, useClass: EuropeanNgbDateParserFormatter}]
})
export class MainComponent implements OnInit {

  @ViewChild('accordion') accordion;
  selectedMenu: Menu;
  showProducts; boolean = false;
  private menusOfTheMonth: Array<Menu> = [];

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

  onDeleteMeal(tmpID: Meal) {
    //Work's because: static-1 opens -> static-2 closes;
    //After the toggle: static-2 opens because of the click
    //But this won't work if we are static-1
    this.accordion.toggle("static-1");
    console.log(tmpID);
  }

  onSelectedProduct(product: Product) {
    console.log("Product selected: ", product.id);
  }

  onDateNavigated(event: NgbDatepickerNavigateEvent) {
    this.menusOfTheMonth.length = 0;
    this.service.getMenuByDate(event.next.month, event.next.year, 8).subscribe(data => {
      data.forEach(menu => {
        console.log(menu.date);
        this.menusOfTheMonth.push(menu);
      });
      console.log("Size: ", this.menusOfTheMonth.length);
    });
  }

  panelChange(evt: any) {
    console.log(evt);
    this.showProducts = evt.nextState;
  }

  containsMenu(date: NgbDateStruct) {
    var nativeDate = new Date();
    nativeDate.setUTCFullYear(date.year, date.month - 1, date.day);
    return this.menusOfTheMonth.find(menu =>
      menu.date.getUTCMonth() == nativeDate.getUTCMonth()
      && menu.date.getUTCDate() == nativeDate.getUTCDate()
      && menu.date.getUTCFullYear() == nativeDate.getUTCFullYear()
    );
  }

  getFormattedDate(date: Date): string {
    return moment(date).format("DD/MM/YYYY");
  }

  onDateChanged() {
    console.log(this.selectedMenu.date);
  }
}
