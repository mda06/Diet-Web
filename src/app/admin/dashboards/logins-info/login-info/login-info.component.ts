import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LoginAccess} from '../../../../model/loginAccess';
import * as moment from 'moment';
import {AdminService} from '../../../service/admin.service';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(private service: AdminService,
              private translate: TranslateService) { }

  ngOnInit() {
    //TODO: Very bad this, use a websocket instead of this
    this.intervalId = setInterval(() => this.initInactivityTime(), 1000);
    this.initInactivityTime();
  }

  initInactivityTime() {
    this.inactivityTime = moment.utc().diff(moment.utc(this.login.lastActivityTime), 'seconds');
    //console.log(this.inactivityTime);
    this.initStyle();
  }

  initStyle() {
    let r = Math.round(this.inactivityTime / 100 * 255);
    if(r > 255) r = 255;
    let g = 255 - Math.round((this.inactivityTime / 100 * 255));
    if(g < 0) g = 0;
    let b = 0;
    let a = 0.6;
    if(this.login.blacklisted) {
      r = g = b = 65;
    } else if(this.login.logOutTime) {
      r = 255;
      g = 100;
      b = 0;
    }

    this.style = {
      'background-color': 'rgba(' +  r + ', ' + g + ', ' + b + ', 0.6)'
    };
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onBlacklistClicked() {
    if(!this.login.blacklisted) {
      this.service.blacklistUser(this.login.authId).subscribe(data => {
          this.login = data;
          this.initStyle();
        } , err => {
          console.log(err);
        }
      );
    } else {
      this.service.unBlacklistUser(this.login.authId).subscribe(data => {
          this.login = data;
          this.initStyle();
        } , err => {
          console.log(err);
        }
      );
    }
  }
}
