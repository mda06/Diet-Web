import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Customer} from "../../model/customer";
import {CustomerService} from '../service/customer.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-select-customer',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent<T extends Customer> implements OnInit {

  @Input() customers: Array<T>;
  @Input() selectedCustomer: T;
  @Input() basei18n: string;
  @Output() onSelectedCustomer = new EventEmitter<T>();
  @Output() onAddCustomer = new EventEmitter();
  filter: String = "";
  currentPage = 1;
  customersPerPage = 5;

  constructor(public translate: TranslateService,
              private modalService: NgbModal,
              private service: CustomerService) {}

  ngOnInit() {}

  select() {
    this.onSelectedCustomer.emit(this.selectedCustomer);
  }

  newCustomer() {
    this.onAddCustomer.emit();
  }

  /*onDeleteCustomer(customer: T) {
    this.service.deleteCustomer(customer).subscribe(data => {
      const index: number = this.customers.indexOf(customer);
      this.customers.splice(index, 1);
    }, err => console.log(err));
  }*/

  onDeleteCustomer(customer: T, content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'Cancel') {
        console.log('Stay here');
      } else if (result === 'Delete') {
        this.service.deleteCustomer(customer).subscribe(data => {
          const index: number = this.customers.indexOf(customer);
          this.customers.splice(index, 1);
        }, err => console.log(err));
      }
    });
  }

  switch(customer: T) {
    this.selectedCustomer = customer;
  }

}
