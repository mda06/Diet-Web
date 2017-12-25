import {Gender} from "./gender";
import {AnthropometricParameter} from "./anthropometricParameter";

export class Patient {
  authId: string;
  birthday: Date;
  created: Date;
  email: string;
  extraInfo: string;
  firstName: string;
  gender: Gender;
  id: number;
  lastName: string;
  middleName: string;
  phone: string;
  anthropometricParameters: Array<AnthropometricParameter>;
}
