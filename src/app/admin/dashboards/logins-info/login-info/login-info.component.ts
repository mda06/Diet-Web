import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LoginAccess} from '../../../../model/loginAccess';
import * as moment from 'moment';
import {AdminService} from '../../../service/admin.service';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent implements OnInit, OnDestroy {

  @Input()
  login: LoginAccess;
  inactivityTime: number = 0;
  intervalId: any;

  constructor(private service: AdminService) { }

  ngOnInit() {
    //TODO: Very bad this, use a websocket instead of this
    this.intervalId = setInterval(() => this.initInactivityTime(), 1000);
  }

  initInactivityTime() {
    this.inactivityTime = moment(moment.now()).diff(this.login.lastActivityTime, 'seconds');
    console.log(this.inactivityTime);
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
