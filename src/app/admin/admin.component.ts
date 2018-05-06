import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavItem} from "../model/nav-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  _opened: boolean = true;
  displayCollapsedNav = false;

  private dashboard: NavItem = {img: "../../assets/img/dashboard.png", title: "NAV.ADMIN.DASHBOARD",
    routerLink: "/admin/dashboard", subMenus: []};
  private food: NavItem = {img: "../../assets/img/food.ico", title: "NAV.ADMIN.FOOD",
    routerLink: "/admin/food", subMenus: []};

  private selectDietItem: NavItem =
    {img: "../../assets/img/diet.png", title: "NAV.DIET.SELECT", routerLink: "/admin/select-diet", subMenus: []};

  private chatItem: NavItem =
    {img: "../../assets/img/chat.png", title: "CHAT", routerLink: "/admin/chat", subMenus: []};

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
    this.navItems.push(this.dashboard);
    this.navItems.push(this.food);
    this.navItems.push(this.selectDietItem);
    this.navItems.push(this.chatItem);
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
    this.sidebar.triggerRerender();
    this.router.navigate([item.routerLink]);
  }

  navTriggerRenderer() {
    this.sidebar.triggerRerender();
  }

}
