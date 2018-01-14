import { Component, OnInit } from '@angular/core';
import {NavItem} from "../model/nav-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  _opened: boolean = true;
  private dietItem: NavItem = {img: "../../assets/img/dashboard.png", title: "NAV.DASHBOARD", routerLink: "/diet/dashboard"};
  private searchItem: NavItem = {img: "../../assets/img/food.ico", title: "NAV.FOOD_SEARCH", routerLink: "/food/search"};
  navItems: Array<NavItem> = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.initNavItems();
  }

  initNavItems() {
    this.navItems.push(this.dietItem);
    this.navItems.push(this.searchItem);
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
    this.router.navigate([item.routerLink]);
  }
}
