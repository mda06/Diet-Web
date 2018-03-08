import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class DateInterceptor implements HttpInterceptor {
  private regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
  private authService: AuthenticationService;

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthenticationService);

    return next.handle(req)
      .do(event => {
        return this.handleHeaders(req, next);
      })
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          let httpError = err as HttpErrorResponse;
          //Redirect to login or maintenance page
          if(httpError.error.message == 'API is in maintenance for: Testing purposse..') {
            console.log("It's in maintenance...");
          }
        }
        return Observable.throw(err);
      });
  }

  private handleHeaders(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isAuthenticated()) {
      const authHeader = this.authService.getAuthorizationHeader();
      const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
      console.log("User is " + (this.authService.isAuthenticated() ? "" : " not ") +  " authenticated for " + authReq.url + " with " + authReq.headers.get("Authorization"));
      console.log("Are the headers equals: " + (authHeader == authReq.headers.get("Authorization")));
      console.log(authReq);
      return this.logAndConvertDate(authReq, next);
    } else {
      return this.logAndConvertDate(req, next);
    }
  }

  private logAndConvertDate(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next
      .handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          this.convertDateStringsToDates(event.body);
          const elapsed = Date.now() - started;
          console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      });
  }

  //http://aboutcode.net/2013/07/27/json-date-parsing-angularjs.html
  private convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (const key in input) {
      if (!input.hasOwnProperty(key)) continue;

      const value = input[key];
      let match;
      // Check for string properties which look like dates.
      if (typeof value === "string" && (match = value.match(this.regexIso8601))) {
        const milliseconds = Date.parse(match[0]);
        //Address number are strings and can be 4 digits long
        //So if this is a number don't set it to a date
        //Idem for vat
        //Check for a better solution !
        if (!isNaN(milliseconds) &&
          key !== 'number' &&
          key !== 'vat') {
          input[key] = new Date(milliseconds);
        }
      } else if (typeof value === "object") {
        // Recurse into object
        this.convertDateStringsToDates(value);
      }
    }
  }
}
