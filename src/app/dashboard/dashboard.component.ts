import { Component, OnInit } from '@angular/core';
import {DashboardItemComponent} from './dashboard-item/dashboard-item.component';
import {DashboardItem} from '../model/dashboardItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Array<DashboardItem> = [];

  constructor() { }

  ngOnInit() {
    this.initItems();
  }

  initItems()
  {
    this.items.push(new DashboardItem(1, 1, 4, 5, "First"));
    this.items.push(new DashboardItem(1, 5, 3, 10, "Second"));
    this.items.push(new DashboardItem(3, 5, 4, 10, "Third"));
    this.items.push(new DashboardItem(4, 1, 7, 6,  "Fourth"));
    this.items.push(new DashboardItem(4, 6, 7, 10, "Fifth"));
  }

}
