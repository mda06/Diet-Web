import {Component, OnInit, ViewChild} from '@angular/core';
import {FoodService} from "../service/food.service";
import {ProductsPaging} from "../../model/productspaging";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Product} from "../../model/product";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('input') input;
  lang: string = "fr";
  name: string = "";
  page: number = 1;
  size: number = 10;
  productsPaging: ProductsPaging;
  selectedProduct: Product;

  searching = false;
  searchFailed = false;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.nameChanged(this.name);
  }

  ngAfterViewInit(){
    this.input.update
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(model => {
        this.nameChanged(model);
      });
  }

  nameChanged(name: string) {
    console.log("Name: ",name);
    this.searching = true;
    this.searchFailed = false;
    this.productsPaging = null;
    this.foodService.getProducts(this.name, this.lang, this.page - 1, this.size)
      .subscribe(
        data => {
          this.productsPaging = data;
        }, err => {
          console.log(err);
          this.searchFailed = true;
        }, () => {
          this.searching = false;
        }
      );
  }

  selectProduct(prod: Product) {
    this.selectedProduct = prod;
    this.foodService.getProduct(prod.id, this.lang)
      .subscribe(data => {
        this.selectedProduct = data;
        console.log(data);
      }, err => {
        console.log("Cannot find product with id: " + prod.id);
      });
  }
}
