import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Menu} from '../../../model/menu';
import {Patient} from '../../../model/patient';
import {MealProduct} from '../../../model/mealProduct';
import {Product} from '../../../model/product';
import {Meal} from '../../../model/meal';
import {isNullOrUndefined} from "util";
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

  onAddNewMeal() {
    const meal = new Meal();
    meal.name = "New meal";
    this.meals.push(meal);

    //It's used in the menu
    if(!isNullOrUndefined(this.selectedMenu)) {
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
    else {
      //It's used in our templates
      //Don't set the menu Id
      //Instead set the diet Id
      this.authService.id.subscribe(id => {
        meal.dietId = id;
        this.service.saveMeal(meal).subscribe(data => {
          meal.id = data.id;
        }, err => console.log(err));
      });
    }
  }

  onAddFromTemplate(meal: Meal) {
    console.log(meal);
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
      this.foodService.getProduct(product.id, this.translate.currentLang).subscribe(prod => {
        mp.product = prod;
        mp.quantity = this.getQuantityOfProduct(prod);
      });
      meal.mealProducts.push(mp);
      this.service.saveMealProduct(mp).subscribe(data => {
          console.log("Meal product saved");
          mp.id = data.id;
        }, err => console.log(err)
      );
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
}
