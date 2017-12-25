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
  private token: Token;
  private role: Role;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.token = JSON.parse(localStorage.getItem("token"));
  }

  onLogin(auth: Authentication): Observable<Role> {
    return new Observable<Role>((observer) => {
      this.http.post<Token>(this.loginUrl, auth, httpOptions).subscribe((data) => {
          console.log("AuthService: user is logged on %s", data.access_token);
          this.token = data;
          localStorage.setItem("token", JSON.stringify(this.token));
          this.initRole().subscribe(role => {
            this.role = role;
            observer.next(this.role);
            observer.complete();
          }, err => {
            observer.error(err);
          });},
        (err) => {
          console.log("AuthService error in logging on - code:%s  msg:%s", err.status, err.message)
          observer.error(err);
        });
    });
  }

  isAuthenticated(): boolean {
    if(this.token == null) return false;
    console.log("Expiration date of token: %s", this.jwtHelper.getTokenExpirationDate(this.token.access_token));
    if(this.jwtHelper.isTokenExpired(this.token.access_token)) return false;
    return true;
  }

  private initRole(): Observable<Role> {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer: " + this.token.access_token);
    return this.http.get<Role>(this.roleUrl, httpOptions);
  }

  getRole(): Role {
    return this.role;
  }

}
