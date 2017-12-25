import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import {Role} from "../model/role.enum";

@Injectable()
export class DietGuardServiceService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated() && this.authService.role === Role.DIET) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          ret: state.url
        }
      });
      return false;
    }
  }

}
