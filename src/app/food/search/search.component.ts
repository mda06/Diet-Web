import {Component, OnInit} from '@angular/core';
import {FoodService} from "../service/food.service";
import {ProductsPaging} from "../../model/productspaging";
import {Observable} from "rxjs/Observable";
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private lang: string;
  private name: string;
  private page: number;
  private size: number;
  private productsPaging: ProductsPaging;

  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.lang = "fr";
    this.name = "";
    this.page = 0;
    this.size = 10;

    /*this.foodService.getProducts(this.name, this.lang, this.page, this.size)
      .subscribe(
        data => {
          console.log("Data fetched");
          this.productsPaging = data;
        }, err => {
          console.log(err);
        }
      );*/
  }

  model: any;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.foodService.getProducts(term, this.lang, this.page, this.size)
          .do(() => this.searchFailed = false)
          .map(term => term.content)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

      formatter = (x: {name: string}) => x.name;

}
