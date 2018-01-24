import {Nutriment} from "./nutriment";

export class Product {
  id: number = 0;
  favorite: boolean = false;
  name: string = "";
  imgUrl: string = "";
  units: Array<Nutriment> = [];
  macros: Array<Nutriment> = [];
  micros: Array<Nutriment> = [];
}
