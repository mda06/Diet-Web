import {Meal} from "./meal";
import {Patient} from "./patient";

export class Menu {
  constructor(date: Date = new Date()) {
    this.date = date;
  }

  id: number = 0;
  patientId: number = 0;
  patient: Patient = null;
  date: Date = new Date();
  meals: Array<Meal> = [];
}
