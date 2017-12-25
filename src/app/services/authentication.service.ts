import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication';
import { Token } from '../model/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  private loginUrl = "api/auth/login";
  private token: Token;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.token = JSON.parse(localStorage.getItem("token"));
  }

  onLogin(auth: Authentication): Observable<Token> {
    var post = this.http.post<Token>(this.loginUrl, auth, httpOptions);
    post.subscribe((data) => {
        console.log("AuthService: user is logged on %s", data.access_token); this.token = data;
        localStorage.setItem("token", JSON.stringify(this.token));},
      err => console.log("AuthService error in logging on - code:%s  msg:%s", err.status, err.message));
    return post;
  }

  isAuthenticated(): boolean {
    if(this.token == null) return false;
    console.log("Expiration date of token: %s", this.jwtHelper.getTokenExpirationDate(this.token.access_token));
    if(this.jwtHelper.isTokenExpired(this.token.access_token)) return false;
    return true;
  }

}
