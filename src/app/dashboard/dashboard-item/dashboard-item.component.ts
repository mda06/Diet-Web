import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

  @HostBinding('style.grid-column')
  /*@Input()*/ row: string = "2 / 4";
  @HostBinding('style.grid-row')
  /*@Input()*/ col: string = "1 / 3";

  constructor() { }

  ngOnInit() {
  }

}
