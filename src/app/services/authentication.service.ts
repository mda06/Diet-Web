import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication';
import { Token } from '../model/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Role} from "../model/role.enum";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  private loginUrl = "api/auth/login";
  private connectedUserUrl = "api/auth/connecteduser";
  private roleUrl = "api/auth/role";
  private _token: Token;
  private _role: Role;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this._token = JSON.parse(localStorage.getItem("token"));
    this._role = JSON.parse(localStorage.getItem("role"));
  }

  onLogin(auth: Authentication): Observable<Role> {
    return new Observable<Role>((observer) => {
      this.http.post<Token>(this.loginUrl, auth, httpOptions).subscribe((data) => {
          console.log("AuthService: user is logged on %s", data.access_token);
          this._token = data;
          localStorage.setItem("token", JSON.stringify(this._token));
          this.initRole().subscribe(role => {
            this._role = role;
            localStorage.setItem("role", JSON.stringify(this._role));
            observer.next(this._role);
            observer.complete();
          }, err => {
            observer.error(err);
          });},
        (err) => {
          console.log("AuthService error in logging on - code:%s  msg:%s", err.status, err.message);
          observer.error(err);
        });
    });
  }

  isAuthenticated(): boolean {
    if(this._token == null) return false;
    console.log("Expiration date of token: %s", this.jwtHelper.getTokenExpirationDate(this._token.access_token));
    return !this.jwtHelper.isTokenExpired(this._token.access_token);
  }

  getConnectedUser(): Observable<any> {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer: " + this._token.access_token);
    return this.http.get<any>(this.connectedUserUrl, httpOptions);
  }

  private initRole(): Observable<Role> {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer: " + this._token.access_token);
    return this.http.get<Role>(this.roleUrl, httpOptions);
  }

  get role(): Role {
    return this._role;
  }

  get token(): Token {
    return this._token;
  }
}
