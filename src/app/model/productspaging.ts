import {Product} from "./product";

export class ProductsPaging {
  constructor(size: number = 0) {
    this.size = size;
  }
  content: Array<Product> = [];
  first: boolean = false;
  last: boolean = false;
  number: number = 0;
  numberOfElements: number = 0;
  size: number = 0;
  sort: string = "";
  totalElements: number = 0;
  totalPages: number = 0;
}
