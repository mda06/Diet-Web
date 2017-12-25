import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css']
})
export class DietDashboardComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

  }

  test() {
    console.log("Role: %s, Token: %s",
      this.authService.role, this.authService.token.access_token);
  }

}
