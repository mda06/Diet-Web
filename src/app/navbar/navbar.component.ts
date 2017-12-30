import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {NavItem} from "../model/nav-item";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() navItems: Array<NavItem>

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.onLogout();
    this.router.navigateByUrl('/login');
  }

}
