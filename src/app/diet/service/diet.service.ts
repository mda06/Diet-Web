import { Injectable } from '@angular/core';
import { Token } from '../../model/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Patient} from "../../model/patient";
import { of } from 'rxjs/observable/of';
import { catchError} from 'rxjs/operators';
import {AnthropometricParameter} from '../../model/anthropometricParameter';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DietService {

  private patientUrl = "api/patient/";
  private patientByDietUrl = "api/patient/dietetist/";
  private paramUrl = "api/param/";
  private _token: Token;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this._token = JSON.parse(localStorage.getItem("token"));
  }

  getPatientsOfDiet(id: number): Observable<Array<Patient>> {
    return this.http.get<Array<Patient>>(this.patientByDietUrl + id, httpOptions);
  }

  //Need to catch the error because diet.component used a route param for the selected patient
  //this id can be 0 so if we don't catch it it will crash the web app
  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(this.patientUrl + id, httpOptions).pipe(
     catchError(this.handleError<Patient>('getPatient'))
    );
    //return this.http.get<Patient>(this.patientUrl + id, httpOptions);
  }

  savePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, patient, httpOptions);
  }

  deleteParam(param: AnthropometricParameter): Observable<any> {
    return this.http.delete<any>(this.paramUrl + param.id, httpOptions);
  }

  get token(): Token {
    return this._token;
  }

  /**
   * https://angular.io/tutorial/toh-pt6
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
