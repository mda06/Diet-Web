import {Component, Input, OnInit} from '@angular/core';
import {SignupAsk} from "../../model/signupAsk";
import {Customer} from "../../model/customer";
import {AuthenticationService} from '../../services/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent<T extends Customer> implements OnInit {

  @Input() customer: T;
  @Input() suffix: string;
  signup: SignupAsk = {customerId:0, email:"", password:""};
  usernameAlreadyTaken: boolean = false;
  pwdCheck: string = "";

  constructor(private service: AuthenticationService,
              public translate: TranslateService) { }

  ngOnInit() {

  }

  onCreateAccount() {
    const copySignup: SignupAsk = {customerId:this.customer.id, email:this.signup.email + this.suffix, password:this.signup.password};
    this.service.onSignup(copySignup).subscribe(data => {
      console.log(data);
      this.customer.authId = "auth0|" + data._id;
      this.usernameAlreadyTaken = false;
    }, err => {
      console.log(err);
      if(!isNullOrUndefined(err.error.errors)) {
       if(err.error.errors.length > 0) {
         if(err.error.errors[0] == "USERNAME_ALREADY_EXISTS")
           this.usernameAlreadyTaken = true;
       }
      }
    });
    console.log(copySignup);
  }

  onUpdateAccount() {
    this.signup.customerId = this.customer.id;
    console.log("Update");
    console.log(this.signup);
  }

}
