import {Nutriment} from "./nutriment";

export class Product {
  id: number = 0;
  name: string = "";
  imgUrl: string = "";
  units: Array<Nutriment> = new Array();
  macros: Array<Nutriment> = new Array();
  micros: Array<Nutriment> = new Array();
}
