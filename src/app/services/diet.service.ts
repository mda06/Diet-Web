import { Injectable } from '@angular/core';
import { Token } from '../model/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Dietetist} from "../model/dietetist";
import {Patient} from "../model/patient";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DietService {

  private patientUrl = "api/patient/";
  private connectedUserUrl = "api/auth/connecteduser";
  private _token: Token;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this._token = JSON.parse(localStorage.getItem("token"));
  }

  getConnectedUser(): Observable<Dietetist> {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer: " + this._token.access_token);
    return this.http.get<Dietetist>(this.connectedUserUrl, httpOptions);
  }

  //NOT TESTED
  getPatient(id: number): Observable<Patient> {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer: " + this._token.access_token);
    return this.http.get<Patient>(this.patientUrl + id, httpOptions);
  }

  savePatient(patient: Patient): Observable<Patient> {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer: " + this._token.access_token);
    return this.http.post<Patient>(this.patientUrl, patient, httpOptions);
  }

  get token(): Token {
    return this._token;
  }

}
