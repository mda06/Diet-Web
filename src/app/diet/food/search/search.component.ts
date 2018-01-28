import {Component, OnInit, ViewChild} from '@angular/core';
import {FoodService} from "../service/food.service";
import {ProductsPaging} from "../../../model/productspaging";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Product} from "../../../model/product";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('input') input;
  name: string = "";
  productsPaging: ProductsPaging = new ProductsPaging(5);
  selectedProduct: Product;

  searching = false;
  searchFailed = false;
  onlyFavs = false;

  constructor(private foodService: FoodService,
              private translate: TranslateService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.findProducts();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.findProducts();
    });
  }

  ngAfterViewInit(){
    this.input.update
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(model => {
        //Need to reset the page number else we cannot find every product
        this.productsPaging.number = 1;
        this.findProducts();
      });
  }

  findProducts() {
    this.searching = true;
    this.searchFailed = false;
    //this.productsPaging = null;
    //The pagination begins with page index 1 but the api is counting from page index 0
    //So when we ask the api -1 and when we get the data back +1
    if(this.onlyFavs) {
      this.authService.id.subscribe(id => {
        this.foodService.getFavProducts(this.translate.currentLang, this.productsPaging.number - 1,
          this.productsPaging.size, id)
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
      });
    } else {
      this.foodService.getProducts(this.name, this.translate.currentLang, this.productsPaging.number - 1,
        this.productsPaging.size)
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
  }

  selectProduct(prod: Product) {
    this.selectedProduct = prod;
    this.authService.id.subscribe(id => {
      this.foodService.getProduct(prod.id, this.translate.currentLang, id)
        .subscribe(data => {
          this.selectedProduct = data;
        }, err => {
          console.log("Cannot find product with id: " + prod.id);
        });
    }, err => console.log("Error getting id"));
  }

  pageChanged(event: number) {
    this.findProducts();
  }

  onFavChanged() {
    this.selectedProduct.favorite = !this.selectedProduct.favorite;
    this.authService.id.subscribe(id => {
      console.log(id);
      if(this.selectedProduct.favorite)
        this.foodService.addProductToFav(id, this.selectedProduct.id).subscribe(data => console.log("Added to fav")
          , err => {console.log("Err fav: ", err)});
      else
        this.foodService.removeProductToFav(id, this.selectedProduct.id).subscribe(data => console.log("Removed from fav")
          , err => {console.log("Err fav: ", err)});
    });
  }

  sizeChanged() {
    //Need to reset the page number else we cannot find every product
    this.productsPaging.number = 1;
    this.findProducts();
  }
}
