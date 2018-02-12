import { Component, OnInit } from '@angular/core';
import { Authentication } from "../model/authentication";
import { AuthenticationService } from "../services/authentication.service";
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Role} from "../model/role.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth: Authentication = {
    username: 'momo@diet.com',
    password: 'momo'
  };
  ret: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(public translate: TranslateService,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //Check the return param and go to /login if nothing is set
    this.route.queryParams
      .subscribe(params => this.ret = params['ret'] || '/login');
  }

  onLogin() {
    this.loading = true;
    this.authService.onLogin(this.auth).subscribe(
      (role) => {
        this.loading = false;
        if(this.ret === '/login') {
          switch(role) {
            case Role.PATIENT:
              this.router.navigateByUrl('patient/dashboard');
              break;
            case Role.ADMIN:
              this.router.navigateByUrl('admin/dashboard');
              break;
            case Role.DIET:
              this.router.navigateByUrl('diet/dashboard');
              break;
          }
        } else {
          this.router.navigateByUrl(this.ret)
        }
      },
      (err) => {this.loading = false; this.error = 'LOGIN.CANNOT_CONNECT'; console.log(err);}
    );
  }

}
