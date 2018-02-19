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
  displaySettings: boolean = false;
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
      }
    });
  }

  onSettingsCogClick() {
    this.displaySettings = !this.displaySettings;
  }

  onBackClick() {
    this.displaySettings = false;
  }

  onNavigate(navItem: NavItem) {
    this.activeNavItem = navItem;
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
  }
}
