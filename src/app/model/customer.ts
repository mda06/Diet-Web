import {Gender} from "./gender";
import {Address} from "./address";

export abstract class Customer {
  authId: string = "";
  birthday: Date = new Date();
  created: Date = new Date();
  email: string = "";
  firstName: string = "";
  gender: Gender = Gender.OTHER;
  id: number = 0;
  lastName: string = "";
  middleName: string = "";
  phone: string = "";
  address: Address = new Address();
}
