import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
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
  private productBatchUrl = "api/product/batch/upload";
  private productFavAdd = "api/product/fav/add";
  private productFavRemove = "api/product/fav/remove";

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

  getProduct(id: number, language: string, dietId: number = 0): Observable<Product> {
    var params = new HttpParams().set('lang', language).set("dietId",  dietId.toString());
    return this.http.get<Product>(this.productUrl + "/" + id, {
      headers: httpOptions.headers,
      params: params
    });
  }

  addProductToFav(dietId: number, productId: number): Observable<any> {
    return this.http.post<any>(this.productFavAdd, {
      headers: httpOptions.headers,
      diet_id: dietId,
      prod_id: productId
    });
  }

  removeProductToFav(dietId: number, productId: number): Observable<any> {
    return this.http.post<any>(this.productFavRemove, {
      headers: httpOptions.headers,
      diet_id: dietId,
      prod_id: productId
    });
  }

  batch(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', this.productBatchUrl, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
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
