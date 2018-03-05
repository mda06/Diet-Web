import {Component, OnInit} from '@angular/core';
import {IDashboardItem} from '../../../model/dashboardItem';
import {TranslateService} from '@ngx-translate/core';
import {ProductsInfoComponent} from '../products-info/products-info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  productInfo: IDashboardItem = {component: ProductsInfoComponent, rowStart: 1, colStart: 1, rowEnd: 2, colEnd: 4, title: "Product Info"};
  items = [this.productInfo];

  constructor(public translate: TranslateService) { }

  ngOnInit() {

  }
}
