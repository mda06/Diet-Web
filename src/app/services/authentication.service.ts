import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication';
import { Token } from '../model/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Role} from "../model/role.enum";
import {isNullOrUndefined} from "util";
import {SignupAsk} from '../model/signupAsk';
import {SignupReturn} from '../model/signupReturn';
import {Patient} from '../model/patient';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  private idUrl = "api/auth/id";
  private loginUrl = "api/auth/login";
  private logoutUrl = "api/auth/logout";
  private signupUrl = "api/auth/signup";
  private connectedUserUrl = "api/auth/connecteduser";
  private roleUrl = "api/auth/role";
  private _token: Token;
  private _role: Role;
  private _id: number;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this._token = JSON.parse(localStorage.getItem("token"));
  }

  onSignup(ask: SignupAsk): Observable<SignupReturn> {
    return this.http.post<SignupReturn>(this.signupUrl, ask, httpOptions);
  }

  onLogin(auth: Authentication): Observable<Role> {
    return new Observable<Role>((observer) => {
      this.http.post<Token>(this.loginUrl, auth, httpOptions).subscribe((data) => {
          console.log("AuthService: user is logged on %s", data.access_token);
          this._token = data;
          localStorage.setItem("token", JSON.stringify(this._token));
          this.initRole().subscribe(role => {
            this._role = role;
            observer.next(this._role);
            observer.complete();
          }, err => {
            observer.error(err);
          });
          },
        (err) => {
          console.log("AuthService error in logging on - code:%s  msg:%s", err.status, err.message);
          observer.error(err);
        });
    });
  }

  onLogout() {
    this.http.post<any>(this.logoutUrl, httpOptions).subscribe(() => {
      console.log("Logout successfully");
      this._id = null;
      localStorage.removeItem('token');
    });

  }

  isAuthenticated(): boolean {
    if(this._token == null) return false;
    console.log("Expiration date of token: %s", this.jwtHelper.getTokenExpirationDate(this._token.access_token));
    return !this.jwtHelper.isTokenExpired(this._token.access_token);
  }

  getConnectedUser(): Observable<any> {
    return this.http.get<any>(this.connectedUserUrl, httpOptions);
  }

  private initRole(): Observable<Role> {
    return this.http.get<Role>(this.roleUrl, httpOptions);
  }

  get id(): Observable<number> {
    //If id is null or not !
    return new Observable<number>((observer) => {
      if(!isNullOrUndefined(this._id)) {
        observer.next(this._id);
        observer.complete();
      } else {
        this.http.get<number>(this.idUrl, httpOptions).subscribe((data) => {
            console.log("AuthService: id of the user is %s", data);
            this._id = data;
            observer.next(this._id);
            observer.complete();
          },
          (err) => {
            console.log("AuthService error in getting id on - code:%s  msg:%s", err.status, err.message);
            observer.error(err);
          });
      }
    });
  }

  getRole(): Observable<Role>{
    return new Observable<Role>((observer) => {
      if(isNullOrUndefined(this._role)) {
        this.initRole().subscribe(role => {
          this._role = role;
          observer.next(this._role);
          observer.complete();
        }, err => {
          observer.error(err);
        });
      } else {
        observer.next(this._role);
        observer.complete();
      }
    });
  }

  get token(): Token {
    return this._token;
  }

  getAuthorizationHeader() {
    return "Bearer " + (this.isAuthenticated() ? this._token.access_token : 0);
  }
}
