import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

  @HostBinding('style.grid-row-start') @Input() rowStart: number = 1;
  @HostBinding('style.grid-row-end') @Input() rowEnd: number = 3;
  @HostBinding('style.grid-column-start') @Input() colStart: number = 2;
  @HostBinding('style.grid-column-end') @Input() colEnd: number = 4;
  @Input() title: string = "Not set";

  constructor() { }

  ngOnInit() {
  }

}
