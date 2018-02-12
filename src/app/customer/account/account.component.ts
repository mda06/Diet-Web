import {Component, Input, OnInit} from '@angular/core';
import {SignupAsk} from "../../model/signupAsk";
import {Customer} from "../../model/customer";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent<T extends Customer> implements OnInit {

  @Input() customer: T;
  signup: SignupAsk = {customerId:0, email:"anthony-uniqueID@patient.com", password:""};

  constructor() { }

  ngOnInit() {

  }

  onCreateAccount() {
    this.signup.customerId = this.customer.id;
    console.log("Create");
    console.log(this.signup);
  }

  onUpdateAccount() {
    this.signup.customerId = this.customer.id;
    console.log("Update");
    console.log(this.signup);
  }

}
