import {Component, OnInit} from '@angular/core';
import {IDashboardItem} from '../../../model/dashboardItem';
import {TranslateService} from '@ngx-translate/core';
import {ProductsInfoComponent} from '../products-info/products-info.component';
import {LoginsInfoComponent} from '../logins-info/logins-info.component';
import {MaintenanceComponent} from '../maintenance/maintenance.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  productInfo: IDashboardItem = {component: ProductsInfoComponent, rowStart: 1, colStart: 4, rowEnd: 2, colEnd: 7, title: "Product Info"};
  maintenance: IDashboardItem = {component: MaintenanceComponent, rowStart: 2, colStart: 4, rowEnd: 5, colEnd: 7, title: "Maintenance"};
  loginsInfo: IDashboardItem = {component: LoginsInfoComponent, rowStart: 1, colStart: 1, rowEnd: 4, colEnd: 4, title: "Logins Info"};
  items = [this.productInfo, this.loginsInfo, this.maintenance];

  constructor() { }

  ngOnInit() {

  }
}
