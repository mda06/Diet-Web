import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {Menu} from "../../../model/menu";
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
import {DeletePopupStrings} from "../../../model/deletepopupstrings";
import {MealProduct} from "../../../model/mealProduct";
import {SharedService} from "../../service/shared.service";
import {Patient} from "../../../model/patient";
import {Subscription} from "rxjs/Subscription";
import {Product} from '../../../model/product';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    {provide: NgbDateParserFormatter, useClass: EuropeanNgbDateParserFormatter}]
})
export class MainComponent implements OnInit {

  selectedMenu: Menu;
  deletePopupStrings: DeletePopupStrings = new DeletePopupStrings();
  private menusOfTheMonth: Array<Menu> = [];
  private subscriptions = new Subscription();
  displayChangeDateOfMenu: boolean = false;
  selectedPatient: Patient;

  constructor(private service: MenuService,
              private foodService: FoodService,
              private dietService: DietService,
              private modalService: NgbModal,
              private sharedService: SharedService,
              public translate: TranslateService) { }

  ngOnInit() {
    this.subscriptions.add(this.sharedService.patient$.subscribe(
      data => {
        if(!isNullOrUndefined(data)) {
          this.selectedPatient = data;
          this.initMenuOfTheDay();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openChangeDate() {
    this.displayChangeDateOfMenu = !this.displayChangeDateOfMenu;
  }

  private initMenuOfTheDay() {
    this.service.getMenuByFullDate(moment().format("YYYY-MM-DD"), this.selectedPatient.id).subscribe(
      data => {
        this.selectedMenu = data;
        if(!isNullOrUndefined(data)) {
          this.dietService.getPatient(data.patientId).subscribe(data => this.selectedMenu.patient = data);
          this.selectedMenu.meals.forEach(meal => {
            meal.mealProducts.forEach(mp => {
              this.foodService.getProduct(mp.productId, this.translate.currentLang).subscribe(data => {
                mp.product = data;
              });
            });
          });
        } else {
          this.createNewMenu();
        }
      }, err => {
        this.createNewMenu();
      }
    );
  }

  onDateNavigated(event: NgbDatepickerNavigateEvent) {
    this.displayChangeDateOfMenu = false;
    this.menusOfTheMonth.length = 0;
    this.service.getMenuByDate(event.next.month, event.next.year, this.selectedPatient.id).subscribe(data => {
      data.forEach(menu => {
        this.menusOfTheMonth.push(menu);
      });
    });
  }

  getFormattedDate(date: Date): string {
    return moment(date).format("DD/MM/YYYY");
  }

  onChangeDateOfMenu(evt) {
    var newMenuForDate = new Menu();
    newMenuForDate.id = this.selectedMenu.id;
    newMenuForDate.date.setUTCFullYear(evt.year, evt.month - 1, evt.day);
    newMenuForDate.patientId = this.selectedMenu.patientId;
    this.service.saveMenu(newMenuForDate).subscribe(
      data => {
        this.selectedMenu.date = data.date;
      },err => console.log(err)
    );
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
      this.createNewMenu(this.selectedMenu.date);
  }

  private takeMenu(id: number) {
    this.service.getMenu(id).subscribe(data => {
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

  onDeleteMenu(content) {
    this.deletePopupStrings = {title:'Deleting', body: 'Deleting the menu', cancel:'Cancel', delete:'Delete'};
    this.modalService.open(content).result.then((result) => {
      if (result === 'Cancel') {
        console.log('Stay here');
      } else if (result === 'Delete') {
        if(this.selectedMenu.id !== 0)
          this.service.deleteMenu(this.selectedMenu.id).subscribe(
            data => console.log("Menu removed"), err => console.log("Error while removing men ", err));
        this.createNewMenu();
      }
    });
  }

  containsMenu(date: NgbDateStruct) {
    const nativeDate = new Date();
    nativeDate.setUTCFullYear(date.year, date.month - 1, date.day);
    return this.menusOfTheMonth.find(menu =>
      menu.date.getUTCMonth() == nativeDate.getUTCMonth()
      && menu.date.getUTCDate() == nativeDate.getUTCDate()
      && menu.date.getUTCFullYear() == nativeDate.getUTCFullYear()
    );
  }


  private createNewMenu(date: Date = new Date()) {
    this.selectedMenu = new Menu(date);
    this.selectedMenu.patientId = this.selectedPatient.id;
  }
}
