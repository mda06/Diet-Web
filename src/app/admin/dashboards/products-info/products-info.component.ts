import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../service/admin.service';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.css']
})
export class ProductsInfoComponent implements OnInit {

  sizeOfProducts: number;

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.service.food.getSize().subscribe(data => this.sizeOfProducts = data);
  }
}
