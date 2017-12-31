import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class DateInterceptor implements HttpInterceptor {
  private regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
  private authService: AuthenticationService

  constructor(private router: Router,
              private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthenticationService);
    const authHeader = this.authService.getAuthorizationHeader();
    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
    return this.logAndConvertDate(authReq, next);
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

    for (var key in input) {
      if (!input.hasOwnProperty(key)) continue;

      var value = input[key];
      var match;
      // Check for string properties which look like dates.
      if (typeof value === "string" && (match = value.match(this.regexIso8601))) {
        var milliseconds = Date.parse(match[0])
        if (!isNaN(milliseconds)) {
          input[key] = new Date(milliseconds);
        }
      } else if (typeof value === "object") {
        // Recurse into object
        this.convertDateStringsToDates(value);
      }
    }
  }
}
