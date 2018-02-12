import {Customer} from "./customer";
import {Patient} from "./patient";

export class Dietetist extends Customer {
  vat: string;
  patients: Array<Patient>
}
