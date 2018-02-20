import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Menu} from "../../../model/menu";
import {Meal} from "../../../model/meal";
import {MealProduct} from "../../../model/mealProduct";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MenuService {

  private menuUrl = "api/menu/";
  private menuDateUrl = "api/menu/date/";
  private mealUrl = "api/meal/";
  private mealProductUrl = "api/meal/product/";
  private mealDietUrl = "api/meal/diet/";
  private mealPatientUrl = "api/meal/patient";

  constructor(private http: HttpClient) {
  }

  getMenuByDate(month: number, year: number, patientId: number): Observable<Array<Menu>> {
    var params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString())
      .set('patientId', patientId.toString());
    return this.http.get<Array<Menu>>(this.menuDateUrl, {
      headers: httpOptions.headers,
      params: params
    });
  }

  getMenuByFullDate(date: string, patientId: number): Observable<Menu> {
    var params = new HttpParams().set('patientId', patientId.toString());
    return this.http.get<Menu>(this.menuDateUrl + date, {
      headers: httpOptions.headers,
      params: params
    });
  }

  getMenu(id: number): Observable<Menu> {
    return this.http.get<Menu>(this.menuUrl + id, httpOptions);
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete<any>(this.menuUrl + id, httpOptions);
  }

  saveMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.menuUrl, menu, httpOptions);
  }

  getMealByDietId(id: number): Observable<Array<Meal>> {
    return this.http.get<Array<Meal>>(this.mealDietUrl + id, httpOptions);
  }

  deleteMeal(id: number): Observable<any> {
    return this.http.delete<any>(this.mealUrl + id, httpOptions);
  }

  saveMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.mealUrl, meal, httpOptions);
  }

  deleteMealProduct(id: number): Observable<any> {
    return this.http.delete<any>(this.mealProductUrl + id, httpOptions);
  }

  saveMealProduct(mp: MealProduct): Observable<MealProduct> {
    return this.http.post<MealProduct>(this.mealProductUrl, mp, httpOptions);
  }

  updatePatientComment(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.mealPatientUrl, meal, httpOptions);
  }
}
