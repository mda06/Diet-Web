import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavItem} from "../model/nav-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  _opened: boolean = true;
  displayCollapsedNav = false;

  private dashboardItem: NavItem =
    {img: "../../assets/img/dashboard.png", title: "NAV.DASHBOARD", routerLink: "/patient/dashboard", subMenus: []};
  private menuItem: NavItem =
    {img: "../../assets/img/menu.png", title: "NAV.MENU.TITLE", routerLink: "/patient/menu", subMenus: []};
  private picturesItem: NavItem =
    {img: "../../assets/img/picture.png", title: "NAV.PICTURES.TITLE", routerLink: "/patient/picture", subMenus: []};

  navItems: Array<NavItem> = [];

  @ViewChild('sidebar') sidebar;

  @HostListener('window:resize') onResize() {
    const winWidth: number = window.innerWidth;
    this.displayCollapsedNav = winWidth <= 500;
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.initNavItems();
  }


  initNavItems() {
    this.navItems.push(this.dashboardItem);
    this.navItems.push(this.menuItem);
    this.navItems.push(this.picturesItem);
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
    this.sidebar.triggerRerender();
    this.router.navigate([item.routerLink]);
  }

}
