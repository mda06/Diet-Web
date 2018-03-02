import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {IDashboardItem} from '../../model/dashboardItem';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

  @Input() model: IDashboardItem;
  @HostBinding('style.grid-row-start') rowStart: number = 1;
  @HostBinding('style.grid-row-end') rowEnd: number = 3;
  @HostBinding('style.grid-column-start') colStart: number = 2;
  @HostBinding('style.grid-column-end') colEnd: number = 4;
  title: string = "Not set";

  constructor() { }

  ngOnInit() {
    this.rowStart = this.model.rowStart;
    this.rowEnd = this.model.rowEnd;
    this.colStart = this.model.colStart;
    this.colEnd = this.model.colEnd;
    this.title = this.model.title;
  }

}
