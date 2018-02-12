import { Component, OnInit } from '@angular/core';
import {NavItem} from "../model/nav-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  _opened: boolean = true;
  private dashboard: NavItem = {img: "../../assets/img/dashboard.png", title: "NAV.ADMIN.DASHBOARD",
    routerLink: "/admin/dashboard", subMenus: []};
  private food: NavItem = {img: "../../assets/img/food.ico", title: "NAV.ADMIN.FOOD",
    routerLink: "/admin/food", subMenus: []};
  /*private aboutPatientItem: NavItem =
    {img: "../../assets/img/about.ico", title: "NAV.PATIENT.ABOUT", routerLink: "/diet/detail-patient", subMenus: []};*/
  private selectDietItem: NavItem =
    {img: "../../assets/img/diet.png", title: "NAV.DIET.SELECT", routerLink: "/admin/select-diet", subMenus: []};

  navItems: Array<NavItem> = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.initNavItems();
  }

  initNavItems() {
    this.navItems.push(this.dashboard);
    this.navItems.push(this.food);
    this.navItems.push(this.selectDietItem);
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
    this.router.navigate([item.routerLink]);
  }

}
