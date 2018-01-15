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
  private productSizeUrl = "api/product/size";
  private productPurgeUrl = "api/product/purge";

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

  purgeProducts() : Observable<any> {
    return this.http.delete<any>(this.productPurgeUrl, httpOptions);
  }

  deleteProduct(id: number) : Observable<any> {
    return this.http.delete<any>(this.productUrl + "/" + id, httpOptions);
  }

  getSize() : Observable<number> {
    return this.http.get<number>(this.productSizeUrl, httpOptions);
  }
}
