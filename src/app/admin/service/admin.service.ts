import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ProductsPaging} from "../../model/productspaging";
import {Product} from "../../model/product";
import {FoodService} from "../../diet/food/service/food.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AdminService {

  constructor(private http: HttpClient, private _food: FoodService) { }

  get food(): FoodService {
    return this._food;
  }

}
