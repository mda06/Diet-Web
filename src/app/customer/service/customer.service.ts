import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Customer} from '../../model/customer';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerService {

  private authDeleteUrl = "api/auth/";

  constructor(private http: HttpClient) { }

  deleteCustomer(customer: Customer): Observable<any> {
    return this.http.delete<any>(this.authDeleteUrl + customer.id, httpOptions);
  }

}
