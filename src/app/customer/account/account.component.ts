import {Component, Input, OnInit} from '@angular/core';
import {SignupAsk} from "../../model/signupAsk";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @Input() customerId: number = 0;
  signup: SignupAsk = {customerId:this.customerId, email:"anthony-uniqueID@patient.com", password:""};

  constructor() { }

  ngOnInit() {

  }

  onCreateAccount() {
    console.log(this.signup);
  }

}
