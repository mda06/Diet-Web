import {Meal} from "./meal";
import {Patient} from "./patient";

export class Menu {
  id: number = 0;
  patientId: number = 0;
  patient: Patient = null;
  date: Date = new Date();
  meals: Array<Meal> = [];
}
