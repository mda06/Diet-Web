import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { LoginService} from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    username: 'caline@patient.com',
    password: 'caline'
  };
  return: string = '';

  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //Check the return param and go to /login if nothing is set
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/login');
  }

  onLogin() {
    this.loginService.onLogin(this.login);
    this.router.navigateByUrl(this.return);
  }

}
