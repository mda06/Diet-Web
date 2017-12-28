import {Gender} from "./gender";
import {AnthropometricParameter} from "./anthropometricParameter";
import {Address} from "./address";

export class Patient {
  authId: string = "";
  birthday: Date = new Date();
  created: Date = new Date();
  email: string = "";
  extraInfo: string = "";
  firstName: string = "";
  gender: Gender = Gender.OTHER;
  id: number = 0;
  lastName: string = "";
  middleName: string = "";
  phone: string = "";
  anthropometricParameters: Array<AnthropometricParameter> = new Array();
  address: Address = new Address();
  dietetistId: number = 0;
}
