import {Component, Input, OnInit} from '@angular/core';
import {SignupAsk} from "../../model/signupAsk";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @Input() customerId: number = 0;
  signup: SignupAsk = {customerId:0, email:"anthony-uniqueID@patient.com", password:""};

  constructor() { }

  ngOnInit() {

  }

  onCreateAccount() {
    this.signup.customerId = this.customerId;
    console.log(this.signup);
  }

}
