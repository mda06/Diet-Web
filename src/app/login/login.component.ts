import { Component, OnInit } from '@angular/core';
import { Authentication } from "../model/authentication";
import { AuthenticationService } from "../services/authentication.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth: Authentication = {
    username: 'caline@patient.com',
    password: 'caline'
  };
  return: string = '';
  error: string = '';

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //Check the return param and go to /login if nothing is set
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/login');
  }

  onLogin() {
    this.authService.onLogin(this.auth).subscribe(
      (role) => {
        if(this.return === '/login') {

        } else {
          this.router.navigateByUrl(this.return)
        }
      },
      (err) => this.error = 'Cannot connect !'
    );
  }

}
