import { Component, OnInit } from '@angular/core';
import {NavItem} from "../model/nav-item";

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
  private _opened: boolean = true;
  private foodItemItem: NavItem = {img: "../../assets/img/food.ico", title: "Food overview", routerLink: "/diet/food"};
  private aboutPatientItem: NavItem = {img: "../../assets/img/about.ico", title: "About Patient", routerLink: "/diet/detail-patient/1"};
  private selectPatientItem: NavItem = {img: "../../assets/img/select-patient.png", title: "Select Patient", routerLink: "/diet/select-patient"};
  private dashboardItem: NavItem = {img: "../../assets/img/dashboard.png", title: "Dashboard", routerLink: "/diet/dashboard"};
  private navItems: Array<NavItem> = new Array();

  constructor() { }

  ngOnInit() {
    this.initNavItems();
    console.log("Diet component !");
  }

  initNavItems() {
    this.navItems.push(this.dashboardItem);
    this.navItems.push(this.foodItemItem);
    this.navItems.push(this.selectPatientItem);
    //Show only if there's a patient selected
    //this.navItems.push(this.aboutPatientItem);
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
