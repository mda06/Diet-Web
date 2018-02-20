import { Component, OnInit } from '@angular/core';
import {Patient} from '../../model/patient';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  patient: Patient = new Patient();

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getConnectedUser().subscribe(
      data => {
        this.patient = data;
        console.log(data);
      },
      err => {console.log("Error trying to get the connected user");}
    );
  }

}
