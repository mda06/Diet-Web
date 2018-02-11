import {AnthropometricParameter} from "./anthropometricParameter";
import {Customer} from "./customer";

export class Patient extends Customer {
  extraInfo: string = "";
  anthropometricParameters: Array<AnthropometricParameter> = [];
  dietetistId: number = 0;
}
