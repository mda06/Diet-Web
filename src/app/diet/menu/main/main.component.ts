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
  deletePopupStrings: DeletePopupStrings = new DeletePopupStrings();
  private menusOfTheMonth: Array<Menu> = [];
  private subscriptions = new Subscription();
  selectedPatient: Patient;
  displayDate: boolean = false;

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
    //this.displayDate = !this.displayDate;
  }

  onDateSelected(evt) {
    console.log(evt);
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
    this.menusOfTheMonth.length = 0;
    this.service.getMenuByDate(event.next.month, event.next.year, this.selectedPatient.id).subscribe(data => {
      data.forEach(menu => {
        this.menusOfTheMonth.push(menu);
      });
    });
  }

  panelChange(evt: any) {
    this.showProducts = evt.nextState;
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

  onAddNewMeal() {
    const meal = new Meal();
    meal.name = "New meal";
    this.selectedMenu.meals.push(meal);
    if(this.selectedMenu.id == 0) {
      //It's a new menu so save it
      this.service.saveMenu(this.selectedMenu).subscribe(
        data => {
          this.selectedMenu = data;
          console.log(data);
        },err => console.log(err)
      );
    } else {
      //It's not a new menu so set the id and save only the meal
      meal.menuId = this.selectedMenu.id;
      this.service.saveMeal(meal).subscribe(data => {
        meal.id = data.id;
      }, err => console.log(err));
    }
  }

  onAddTemplateMeal() {
    console.log("Adding a meal from ours template");
  }

  onDeleteMeal(meal: Meal, popupDelete) {
    this.accordion.toggle("panel-" + meal.id);
    this.deletePopupStrings = {title:'Deleting', body: 'Deleting the meal', cancel:'Cancel', delete:'Delete'};

    this.modalService.open(popupDelete).result.then((result) => {
      if (result === 'Cancel') {
        console.log('Stay here');
      } else if (result === 'Delete') {
        console.log('Delete meal');
        if(meal.id !== 0)
          this.service.deleteMeal(meal.id).subscribe(
            data => {
              console.log("Meal removed");
              const index: number = this.selectedMenu.meals.indexOf(meal);
              this.selectedMenu.meals.splice(index, 1);
            }, err => console.log("Error while removing meal ", err));
      }
    });
  }

  onBlurName(meal: Meal) {
    this.service.saveMeal(meal).subscribe(data => console.log(data), err => console.log(err));
  }

  onBlurExtraInfo(meal: Meal) {
    this.service.saveMeal(meal).subscribe(data => console.log(data), err => console.log(err));
  }

  onMealProductDrop(meal: Meal, evt: any) {
    const product = evt.dragData;
    var mp = meal.mealProducts.find(mp => mp.productId === product.id);
    if(isNullOrUndefined(mp)) {
      mp = new MealProduct();
      mp.productId = product.id;
      mp.product = product;
      mp.mealId = meal.id;
      mp.quantity = 50;
      meal.mealProducts.push(mp);
      this.service.saveMealProduct(mp).subscribe(data => {
          console.log("Meal product saved");
          console.log(data);
          mp.id = data.id;
        }, err => console.log(err)
      );
    } else {
      mp.quantity += 50;
      this.service.saveMealProduct(mp).subscribe(data => console.log("Meal product saved"), err => console.log(err));
    }
  }

  onBlurMealProductQuantity(mp: MealProduct) {
    if(mp.quantity != null)
     this.service.saveMealProduct(mp).subscribe(data => console.log(data), err => console.log(err));
  }

  onDeleteProduct(meal:Meal, mp: MealProduct) {
    this.service.deleteMealProduct(mp.id).subscribe(
      data => {
        console.log("MealProduct removed");
        const index: number = meal.mealProducts.indexOf(mp);
        meal.mealProducts.splice(index, 1);
      }, err => console.log("Error while removing meal product", err));
  }
}
