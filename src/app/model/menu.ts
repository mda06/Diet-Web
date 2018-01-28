import {Meal} from "./meal";

export class Menu {
  id: number = 0;
  patientId: number = 0;
  date: Date = new Date();
  meals: Array<Meal> = [];
}
