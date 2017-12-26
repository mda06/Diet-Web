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

  private getPatientUrl = "api/patient/";
  private connectedUserUrl = "api/auth/connecteduser";
  private _token: Token;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this._token = JSON.parse(localStorage.getItem("token"));
  }

  getConnectedUser(): Observable<Dietetist> {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer: " + this._token.access_token);
    //First we need to catch the http here to define the dates and after this we can pass the diet to the rest
    return new Observable<Dietetist>((observer) => {
      this.http.get<Dietetist>(this.connectedUserUrl, httpOptions)
        .subscribe(
          data => {
            for(let pat of data.patients) {
              //TODO: change the created date also
              pat.birthday = new Date(pat.birthday);
            }
            observer.next(data);
            observer.complete();
        },
          error2 => {
            observer.error(error2)
          });
    });
  }

  //NOT TESTED
  getPatient(id: number): Observable<Patient> {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer: " + this._token.access_token);
    return this.http.get<Patient>(this.connectedUserUrl + id, httpOptions);
  }

  get token(): Token {
    return this._token;
  }

}
