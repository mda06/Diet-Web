import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {NavItem} from "../model/nav-item";
import { TranslateService } from '@ngx-translate/core';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() navItems: Array<NavItem>;
  @Output() navItemClicked = new EventEmitter<NavItem>();
  private oldDisplay = "";
  displayType = "menu";
  selectedLang = "en";
  activeNavItem: NavItem;

  constructor(public translate: TranslateService,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.selectedLang = this.translate.currentLang;
    this.navItems.forEach(item => {
      if(this.router.url === item.routerLink) {
        this.activeNavItem = item;
        if(this.activeNavItem.subMenus.length > 0)
          this.displayType = 'submenu';
      }
    });
  }

  onSettingsCogClick() {
    if (this.displayType != "settings") {
      this.oldDisplay = this.displayType;
      this.displayType = 'settings';
    }
  }

  onBackClick() {
    if(this.displayType == 'settings' && this.oldDisplay != "")
      this.displayType = this.oldDisplay;
    else
      this.displayType = 'menu';
  }

  onNavigate(navItem: NavItem) {
    this.activeNavItem = navItem;
    if(this.activeNavItem.subMenus.length > 0)
      this.displayType = 'submenu';
    this.navItemClicked.emit(navItem);
  }

  onSubNavigate(navItem: NavItem) {
    this.navItemClicked.emit(navItem);
  }

  onChangeLang(lang: string) {
    this.translate.use(lang);
  }

  onLogout() {
    this.authService.onLogout();
    this.router.navigateByUrl('/login');
  }

  isActive(item: NavItem): boolean {
    return this.activeNavItem == item;
  }

  hasActiveMenuSubMenus(): boolean {
    if(isNullOrUndefined(this.activeNavItem)) return false;
    return this.activeNavItem.subMenus.length != 0;
    //return !isNullOrUndefined(this.activeNavItem.subMenus);
  }
}
