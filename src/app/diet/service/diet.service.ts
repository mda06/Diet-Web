import { Injectable } from '@angular/core';
import { Token } from '../../model/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DietService {

  private patientUrl = "api/patient/";
  private patientByDietUrl = "api/patient/dietetist/";
  private connectedUserUrl = "api/auth/connecteduser";
  private _token: Token;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this._token = JSON.parse(localStorage.getItem("token"));
  }

  getConnectedUser(): Observable<Dietetist> {
    return this.http.get<Dietetist>(this.connectedUserUrl, httpOptions);
  }

  getPatientsOfDiet(id: number): Observable<Array<Patient>> {
    return this.http.get<Array<Patient>>(this.patientByDietUrl + id, httpOptions);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(this.patientUrl + id, httpOptions);
  }

  savePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, patient, httpOptions);
  }

  get token(): Token {
    return this._token;
  }

}
