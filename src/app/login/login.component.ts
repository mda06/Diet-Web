import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { LoginService} from './login.service';

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

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onLogin() {
    this.loginService.onLogin(this.login)
      .subscribe((data) => {console.log("Data fetched: " + data.access_token);},
            err => console.log("Cannot connect"));
  }

}
