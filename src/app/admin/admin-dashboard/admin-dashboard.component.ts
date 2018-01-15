import { Component, OnInit } from '@angular/core';
import {AdminService} from "../service/admin.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  sizeOfProducts: number;

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.service.food.getSize().subscribe(data => this.sizeOfProducts = data);
  }

}
