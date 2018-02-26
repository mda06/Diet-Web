import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

  @Input() row: string = "";
  @Input() col: string = "";

  constructor() { }

  ngOnInit() {
  }

}
