import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Menu} from "../../../model/menu";
import {Meal} from "../../../model/meal";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MenuService {

  private menuUrl = "api/menu/";
  private menuDateUrl = "api/menu/date";
  private mealUrl = "api/meal/";

  constructor(private http: HttpClient) {
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

  saveMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.mealUrl, meal, httpOptions);
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

  /*savePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, patient, httpOptions);
  }*/

}
