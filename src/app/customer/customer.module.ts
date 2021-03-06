import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { SelectComponent } from './select/select.component';
import { DetailComponent } from './detail/detail.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CustomerFilterPipe} from "./pipes/CustomerFilterPipe";
import {NavbarModule} from "../navbar/navbar.module";
import { AccountComponent } from './account/account.component';
import {CustomerService} from './service/customer.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NavbarModule,
  ],
  declarations: [
    CustomerComponent,
    SelectComponent,
    DetailComponent,
    CustomerFilterPipe,
    AccountComponent
  ],
  exports: [
    CustomerComponent,
    SelectComponent,
    DetailComponent,
    AccountComponent
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
