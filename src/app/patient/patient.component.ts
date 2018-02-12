import { Component, OnInit } from '@angular/core';
import {NavItem} from "../model/nav-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  _opened: boolean = true;
  private dashboardItem: NavItem =
    {img: "../../assets/img/dashboard.png", title: "NAV.DASHBOARD", routerLink: "/patient/dashboard", subMenus: []};

  navItems: Array<NavItem> = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.initNavItems();
  }


  initNavItems() {
    this.navItems.push(this.dashboardItem);
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
    this.router.navigate([item.routerLink]);
  }

}
