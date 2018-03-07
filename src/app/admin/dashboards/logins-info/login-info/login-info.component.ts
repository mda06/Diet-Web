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
  style = {};

  constructor(private service: AdminService) { }

  ngOnInit() {
    //TODO: Very bad this, use a websocket instead of this
    this.intervalId = setInterval(() => this.initInactivityTime(), 1000);
    this.initInactivityTime();
  }

  initInactivityTime() {
    this.inactivityTime = moment(moment.now()).diff(this.login.lastActivityTime, 'seconds');
    //console.log(this.inactivityTime);
    this.initStyle();
  }

  initStyle() {
    let r = Math.round(this.inactivityTime / 100 * 255);
    if(r > 255) r = 255;
    let g = 255 - Math.round((this.inactivityTime / 100 * 255));
    if(g < 0) g = 0;
    console.log(r, " - ", g);
    this.style = {
      'background-color': 'rgba(' +  r + ', ' + g + ', 0, 0.6)'
    };
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
