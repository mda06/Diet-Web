import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication';
import { Token } from '../model/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Role} from "../model/role.enum";
import {isNullOrUndefined} from "util";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  private idUrl = "api/auth/id";
  private loginUrl = "api/auth/login";
  private connectedUserUrl = "api/auth/connecteduser";
  private roleUrl = "api/auth/role";
  private _token: Token;
  private _role: Role;
  private _id: number;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this._token = JSON.parse(localStorage.getItem("token"));
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
          this.initId().subscribe(id => {
            console.log("Id is ", id, " of the user");
            this._id = id;
          }, err => {
            console.log("Error while trying to get the id");
            console.log(err);
          })
          },
        (err) => {
          console.log("AuthService error in logging on - code:%s  msg:%s", err.status, err.message);
          observer.error(err);
        });
    });
  }

  onLogout() {
    localStorage.removeItem('token');
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

  private initId() : Observable<number> {
    return this.http.get<number>(this.idUrl, httpOptions);
  }
  //TODO: Merge init and id in the same method
  get id(): number {
    return this._id;
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
