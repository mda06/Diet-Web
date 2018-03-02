import { Component, OnInit } from '@angular/core';
import {DashboardItemComponent} from '../../../dashboard/dashboard-item/dashboard-item.component';
import {IDashboardItem} from '../../../model/dashboardItem';

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.css']
})
export class FoodInfoComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }

}
