import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Menu} from '../../../model/menu';
import {Patient} from '../../../model/patient';
import {MealProduct} from '../../../model/mealProduct';
import {Product} from '../../../model/product';
import {Meal} from '../../../model/meal';
import {isNullOrUndefined} from "util";
import * as _ from 'lodash';
import {MenuService} from '../service/menu.service';
import {TranslateService} from '@ngx-translate/core';
import {DeletePopupStrings} from '../../../model/deletepopupstrings';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FoodService} from '../../food/service/food.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  @Input() selectedMenu: Menu;
  @Input() selectedPatient: Patient;
  @Input() meals: Array<Meal> = [];
  templateMeals: Array<Meal> = [];
  showProducts; boolean = false;
  @ViewChild('accordion') accordion;
  deletePopupStrings: DeletePopupStrings = new DeletePopupStrings();
  displayProduct: Product;

  constructor(private service: MenuService,
              private modalService: NgbModal,
              private foodService: FoodService,
              private authService: AuthenticationService,
              public translate: TranslateService) {}

  ngOnInit() {
  }

  panelChange(evt: any) {
    //this.displayChangeDateOfMenu = false;
    this.showProducts = evt.nextState;
  }

  private checkMealProducts(meal: Meal) {
    meal.mealProducts.forEach(mp => {
      if(isNullOrUndefined(mp.product)) {
        this.foodService.getProduct(mp.productId, this.translate.currentLang).subscribe(data => {
          mp.product = data;
        });
      }
    });
  }

  private addMeal(meal: Meal) {
    this.meals.push(meal);

    //It's used in the menu
    if(!isNullOrUndefined(this.selectedMenu)) {
      if(this.selectedMenu.id == 0) {
        //It's a new menu so save it
        this.service.saveMenu(this.selectedMenu).subscribe(
          data => {
            //Merge the data else MainComponent will lose his reference to this object
            this.selectedMenu = _.merge(this.selectedMenu, data);
            this.meals = this.selectedMenu.meals;
            this.checkMealProducts(meal);
          },err => console.log(err)
        );
      } else {
        //It's not a new menu so set the id and save only the meal
        meal.menuId = this.selectedMenu.id;
        this.service.saveMeal(meal).subscribe(data => {
          meal.id = data.id;
          this.checkMealProducts(meal);
        }, err => console.log(err));
      }
    }
    else {
      //It's used in our templates
      //Don't set the menu Id, set the diet Id
      //No need to add the meal products becausse it's only from template to menu
      this.authService.id.subscribe(id => {
        meal.dietId = id;
        this.service.saveMeal(meal).subscribe(data => {
          meal.id = data.id;
        }, err => console.log(err));
      });
    }
  }

  onAddNewMeal() {
    this.translate.get("MEALS.NEW_TITLE").subscribe(data => {
      const meal = new Meal();
      meal.name = data;
      this.addMeal(meal);
    });
  }

  onAddFromTemplate(template: Meal) {
    //Copy the meal
    const meal = new Meal();
    meal.name = template.name;
    meal.extraInfo = template.extraInfo;
    template.mealProducts.forEach(mp => {
      const newMp = new MealProduct();
      newMp.quantity = mp.quantity;
      newMp.productId = mp.productId;
      meal.mealProducts.push(newMp);
    });
    console.log(meal);
    this.addMeal(meal);
  }

  onShowTemplateMeals(popupTemplates) {
    this.authService.id.subscribe(id => {
      this.service.getMealByDietId(id).subscribe(data => {
        this.templateMeals = data;
        this.modalService.open(popupTemplates).result.then((result) => {
          if (result === 'Cancel') {
            console.log('Stay here');
          } else if (result === 'Select') {
            console.log('Select template');
          }
        });
      }, err => console.log(err));
    });
  }

  onDeleteMeal(meal: Meal, popupDelete) {
    this.accordion.toggle("panel-" + meal.id);
    this.deletePopupStrings = {
      title:'MEALS.DELETE_POPUP.TITLE',
      body: 'MEALS.DELETE_POPUP.BODY',
      cancel:'MEALS.DELETE_POPUP.CANCEL',
      delete:'MEALS.DELETE_POPUP.DELETE'
    };

    this.modalService.open(popupDelete).result.then((result) => {
      if (result === 'Cancel') {
        console.log('Stay here');
      } else if (result === 'Delete') {
        console.log('Delete meal');
        if(meal.id !== 0)
          this.service.deleteMeal(meal.id).subscribe(
            data => {
              console.log("Meal removed");
              const index: number = this.meals.indexOf(meal);
              this.meals.splice(index, 1);
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
      meal.mealProducts.push(mp);
      this.foodService.getProduct(product.id, this.translate.currentLang).subscribe(prod => {
        mp.product = prod;
        mp.quantity = this.getQuantityOfProduct(prod);
        this.service.saveMealProduct(mp).subscribe(data => {
            console.log("Meal product saved");
            mp.id = data.id;
          }, err => console.log(err)
        );
      });
    } else {
      mp.quantity += this.getQuantityOfProduct(mp.product);
      this.service.saveMealProduct(mp).subscribe(data => console.log("Meal product saved"), err => console.log(err));
    }
  }

  private getQuantityOfProduct(prod: Product) {
    if(prod.units.length >= 1) {
      return prod.units[0].value;
    } else {
      return 50;
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

  onSelectedProduct(prod: Product, popupProduct) {
    this.displayProduct = prod;
    this.modalService.open(popupProduct).result.then((result) => {
      /*if (result === 'Cancel') {
        console.log('Stay here');
      } else if (result === 'Delete') {
        console.log('Delete meal');
        if(meal.id !== 0)
          this.service.deleteMeal(meal.id).subscribe(
            data => {
              console.log("Meal removed");
              const index: number = this.meals.indexOf(meal);
              this.meals.splice(index, 1);
            }, err => console.log("Error while removing meal ", err));
      }*/
    });
    console.log("It's a product");
    console.log(this.displayProduct);
  }
}
