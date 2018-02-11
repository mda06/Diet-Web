import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Customer} from "../../model/customer";

@Component({
  selector: 'app-select-customer',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent<T extends Customer> implements OnInit {

  @Input() customers: Array<T>;
  @Input() selectedCustomer: T;
  @Output() onSelectedCustomer = new EventEmitter<T>();
  @Output() onAddCustomer = new EventEmitter();
  filter: String = "";
  currentPage = 1;
  customersPerPage = 5;

  constructor(public translate: TranslateService) {}

  ngOnInit() {}

  select() {
    this.onSelectedCustomer.emit(this.selectedCustomer);
  }

  newPatient() {
    this.onAddCustomer.emit();
  }


  switch(customer: T) {
    this.selectedCustomer = customer;
  }

}
