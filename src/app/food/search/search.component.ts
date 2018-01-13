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
  productsPaging: ProductsPaging = new ProductsPaging();
  //[(ngModel)]="productsPaging.size"
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
    //this.productsPaging = null;
    //The pagination begins with page index 1 but the api is counting from page index 0
    //So when we ask the api -1 and when we get the data back +1
    this.foodService.getProducts(this.name, this.lang, this.productsPaging.number - 1, this.productsPaging.size)
      .subscribe(
        data => {
          data.number++;
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
      }, err => {
        console.log("Cannot find product with id: " + prod.id);
      });
  }

  pageChanged(event: number) {
    this.nameChanged(this.name);
  }
}
