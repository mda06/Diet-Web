import { Component, OnInit } from '@angular/core';
import {MenuService} from "../service/menu.service";
import {Menu} from "../../../model/menu";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedMenu: Menu;

  constructor(private service: MenuService) { }

  ngOnInit() {
    this.selectedMenu = new Menu();
  }

  onDelete(tmpID: number) {
    console.log(tmpID);
  }
}
