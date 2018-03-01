import { Component, OnInit } from '@angular/core';
import {DashboardItemComponent} from './dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Array<DashboardItemComponent> = [];

  constructor() { }

  ngOnInit() {
  }

  addItem(r1, c1, r2, c2)
  {
    this.items.push(new DashboardItemComponent());
  }

}
