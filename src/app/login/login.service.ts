import { Injectable } from '@angular/core';
import { Login } from './login';
import { Token } from './token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  private loginUrl = "api/auth/login";
  private token: Token;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.token = JSON.parse(localStorage.getItem("token"));
  }

  onLogin(login: Login): Observable<Token> {
    var post = this.http.post<Token>(this.loginUrl, login, httpOptions);
    post.subscribe((data) => {
      console.log("LoginService: user is logged on %s", data.access_token); this.token = data;
      localStorage.setItem("token", JSON.stringify(this.token));},
      err => console.log("LoginService error in logging on - code:%s  msg:%s", err.status, err.message));
    return post;
  }

  isConnected(): boolean {
    if(this.token == null) return false;
    console.log("ExpirationDate: %s", this.jwtHelper.getTokenExpirationDate(this.token.access_token));
    if(this.jwtHelper.isTokenExpired(this.token.access_token)) return false;
    return true;
  }

}
