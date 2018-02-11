import {Component, Input, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Gender} from "../../model/gender";
import {isNullOrUndefined} from "util";
import {TranslateService} from "@ngx-translate/core";
import {Customer} from "../../model/customer";

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent<T extends Customer> implements OnInit {

  @Input() customer: T;
  public isAddressCollapsed = true;
  model: NgbDateStruct;
  public genders = this.enumSelector(Gender);

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    //Need to do it later maybe ? If the model changes
    if(!isNullOrUndefined(this.customer)) {
      this.initDateModel();
    }
  }

  initDateModel() {
    this.model = { day: this.customer.birthday.getUTCDate(), month: this.customer.birthday.getUTCMonth() + 1,
      year: this.customer.birthday.getUTCFullYear()};
  }

  enumSelector(definition) {
    return Object.keys(definition)
      .map(key => ({ value: definition[key], title: key }));
  }

  birthdayChange() {
    this.customer.birthday.setUTCFullYear(this.model.year, this.model.month - 1, this.model.day);
  }

  public formatGender(gender: string): string {
    return "CUSTOMER.DETAIL.GENDER." + gender;
  }
}
