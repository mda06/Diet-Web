import { Component, OnInit } from '@angular/core';
import {DashboardItemComponent} from '../../../dashboard/dashboard-item/dashboard-item.component';
import {IDashboardItem} from '../../../model/dashboardItem';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
