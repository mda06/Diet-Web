import { Component, OnInit } from '@angular/core';
import {LoginAccess} from '../../../model/loginAccess';
import {AdminService} from '../../service/admin.service';

@Component({
  selector: 'app-logins-info',
  templateUrl: './logins-info.component.html',
  styleUrls: ['./logins-info.component.css']
})
export class LoginsInfoComponent implements OnInit {

  logins: Array<LoginAccess> = [];

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.service.getLoginAccess().subscribe(data => {
      this.logins = data;
    });
  }
}
