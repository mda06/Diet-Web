import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ProductsPaging} from "../../model/productspaging";
import {Product} from "../../model/product";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FoodService {

  private productUrl = "api/product";

  constructor(private http: HttpClient) { }

  getProducts(name: string, language: string, page: number, size: number): Observable<ProductsPaging> {
    var params = new HttpParams()
      .set('name', name)
      .set('lang', language)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ProductsPaging>(this.productUrl, {
      headers: httpOptions.headers,
      params: params
    });
  }

  getProduct(id: number, language: string): Observable<Product> {
    var params = new HttpParams().set('lang', language)
    return this.http.get<Product>(this.productUrl + "/" + id, {
      headers: httpOptions.headers,
      params: params
    });
  }
}
