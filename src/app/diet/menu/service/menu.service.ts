import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MenuService {

  private menuUrl = "api/menu/";

  constructor(private http: HttpClient) {
  }

  /*getPatientsOfDiet(id: number): Observable<Array<Patient>> {
    return this.http.get<Array<Patient>>(this.patientByDietUrl + id, httpOptions);
  }

  savePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, patient, httpOptions);
  }*/

}
