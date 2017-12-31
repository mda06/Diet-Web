import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import {Role} from "../model/role.enum";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AdminGuardServiceService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    //Not authenticated return false and go to login
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: {
          ret: state.url
        }
      });
      return false;
    } else {
      //Else we need to check the permission
      return new Observable<boolean>((observer) => {
        this.authService.getRole().subscribe(
          (data) => {
            observer.next(data == Role.ADMIN);
            observer.complete();
          }, (err) => {
            observer.error(err);
          }
        );
      });
    }
  }

}
