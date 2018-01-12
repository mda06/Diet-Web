import { Component, OnInit } from '@angular/core';
import {FoodService} from "../service/food.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private foodService: FoodService) { }

  ngOnInit() {
  }

}
