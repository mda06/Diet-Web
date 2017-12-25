import {Gender} from "./gender";
import {Patient} from "./patient";
import {Address} from "./address";

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
  address: Address;
  patients: Array<Patient>
}
