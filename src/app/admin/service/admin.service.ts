import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {FoodService} from "../../diet/food/service/food.service";
import {Dietetist} from "../../model/dietetist";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AdminService {

  private dietUrl = "api/dietetist/";

  constructor(private http: HttpClient, private _food: FoodService) { }

  get food(): FoodService {
    return this._food;
  }

  getDietetists(): Observable<Array<Dietetist>> {
    return this.http.get<Array<Dietetist>>(this.dietUrl, httpOptions);
  }

  getDietetist(id: number): Observable<Dietetist> {
    return this.http.get<Dietetist>(this.dietUrl + id, httpOptions);
  }

}
