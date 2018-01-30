import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {NavItem} from "../model/nav-item";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() navItems: Array<NavItem>;
  @Output() navItemClicked = new EventEmitter<NavItem>();

  constructor(public translate: TranslateService,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  navigate(navItem: NavItem) {
    this.navItemClicked.emit(navItem);
  }

  logout() {
    this.authService.onLogout();
    this.router.navigateByUrl('/login');
  }

  isActive(item: NavItem): boolean {
    //Do we need to go to all the children ?
    var isItemActive = this.router.url === item.routerLink;
    item.subMenus.forEach(subItem => {
      if(this.router.url === subItem.routerLink) {
        isItemActive = true;
      }
    });
    return isItemActive;
  }
}
