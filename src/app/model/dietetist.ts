import {Gender} from "./gender";
import {Patient} from "./patient";

export class Dietetist {
  authId: string;
  birthday: Date;
  created: Date;
  email: string;
  firstName: string;
  gender: Gender;
  id: number;
  lastName: string;
  middleName: string;
  phone: string;
  vat: string;
  patients: Array<Patient>
}
