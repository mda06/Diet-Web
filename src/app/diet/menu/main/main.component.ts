import { Component, OnInit } from '@angular/core';
import {MenuService} from "../service/menu.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private service: MenuService) { }

  ngOnInit() {
  }

}
