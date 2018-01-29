import { Component, OnInit } from '@angular/core';
import {Product} from "../../../model/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedProduct: Product;

  constructor() { }

  ngOnInit() {
  }

  onSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }
}
