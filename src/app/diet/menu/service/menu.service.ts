import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Menu} from "../../../model/menu";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MenuService {

  private menuUrl = "api/menu/";

  constructor(private http: HttpClient) {
  }

  getMenu(id: number): Observable<Menu> {
    return this.http.get<Menu>(this.menuUrl + id, httpOptions);
  }

  /*savePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, patient, httpOptions);
  }*/

}
