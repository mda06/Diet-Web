import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {Menu} from "../../../model/menu";
import {Product} from "../../../model/product";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('accordion') accordion;
  selectedMenu: Menu;
  showProducts; boolean = false;

  constructor(private service: MenuService) { }

  ngOnInit() {
    this.selectedMenu = new Menu();
  }

  onDelete(tmpID: number) {
    //Work's because: static-1 opens -> static-2 closes;
    //After the toggle: static-2 opens because of the click
    //But this won't work if we are static-1
    this.accordion.toggle("static-1");
    console.log(tmpID);
  }

  onEdit(tmpID: number) {
    console.log(tmpID);
  }

  onSelectedProduct(product: Product) {
    console.log("Product selected: ", product.id);
  }

  panelChange(evt: any) {
    console.log(evt);
    this.showProducts = evt.nextState;
  }
}
