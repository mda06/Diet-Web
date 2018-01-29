import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import {FoodService} from "../service/food.service";
import {Product} from "../../../model/product";

@Component({
  selector: 'app-detail-food',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() selectedProduct: Product;

  constructor(private foodService: FoodService,
              private translate: TranslateService,
              private authService: AuthenticationService) { }

  ngOnInit() {
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
}
