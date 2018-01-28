import {MealProduct} from "./mealProduct";

export class Meal {
  id: number = 0;
  menuId: number = 0;
  name: string = "";
  extraInfo: string = "";
  comment: string = "";
  score: number = 0;
  mealProducts: Array<MealProduct> = [];
}
