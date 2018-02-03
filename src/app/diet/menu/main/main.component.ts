import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {Menu} from "../../../model/menu";
import {Product} from "../../../model/product";
import {FoodService} from "../../food/service/food.service";
import {TranslateService} from "@ngx-translate/core";
import {DietService} from "../../service/diet.service";
import * as moment from 'moment';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbDateNativeAdapter} from "../../../share/NgbDateNativeAdapter";
import {Meal} from "../../../model/meal";
import {EuropeanNgbDateParserFormatter} from "../../../share/EuropeanNgbDateParserFormatter";
import {NgbDatepickerNavigateEvent} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker";
import {isNullOrUndefined} from "util";

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
              private modalService: NgbModal,
              public translate: TranslateService) { }

  ngOnInit() {
    this.selectedMenu = new Menu();
    //this.takeMenu(8);
  }

  private takeMenu(id: number) {
    console.log("Taking ", id, "the menu");
    this.service.getMenu(id).subscribe(data => {
        this.selectedMenu = data;
        console.log(data.id, " for the date of ", data.date);
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
        this.menusOfTheMonth.push(menu);
      });
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
    const menu = this.menusOfTheMonth.find(menu =>
      menu.date.getUTCMonth() == this.selectedMenu.date.getUTCMonth()
      && menu.date.getUTCDate() == this.selectedMenu.date.getUTCDate()
      && menu.date.getUTCFullYear() == this.selectedMenu.date.getUTCFullYear()
    );
    if(!isNullOrUndefined(menu))
      this.takeMenu(menu.id);
    else
      this.selectedMenu = new Menu(this.selectedMenu.date);
  }

  onDeleteMenu(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'Cancel') {
        console.log('Stay here');
      } else if (result === 'Delete') {
        if(this.selectedMenu.id !== 0)
          this.service.deleteMenu(this.selectedMenu.id).subscribe(
            data => console.log("Menu removed"), err => console.log("Error while removing men ", err));
        this.selectedMenu = new Menu();
      }
    });
  }
}
