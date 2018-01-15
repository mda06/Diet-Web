import { Component, OnInit } from '@angular/core';
import {AdminService} from "../service/admin.service";
import {Product} from "../../model/product";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IAlert} from "../../model/i-alert";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  productToDelete: Product;
  searchingProductToDelete: boolean = false;
  purgingCheck: boolean = false;
  productId: number;
  sizeOfProducts: number;
  public alerts: Array<IAlert> = [];
  alertCounter: number = 0;

  constructor(private service: AdminService,
              private translateService: TranslateService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.initFoodSize();
  }

  initFoodSize() {
    this.service.food.getSize().subscribe(data => this.sizeOfProducts = data);
  }

  onDeleteProduct(content) {
    this.searchingProductToDelete = true;
    this.service.food.getProduct(this.productId, this.translateService.currentLang).subscribe(
      data => {
        this.searchingProductToDelete = false;
        this.productToDelete = data;
        this.modalService.open(content).result.then((result) => {
          if (result === 'Cancel') {
            console.log('Stay here');
          } else if (result === 'Confirm') {
            //Delete it here
            this.alerts.push({id: this.alertCounter, type:'warning',
              message:'ADMIN.PRODUCT.DELETE', subMessage: ' ' + this.productId});
            setTimeout((index) => this.closeAlertWithId(index) ,2500, this.alertCounter++);
            this.service.food.deleteProduct(this.productId).subscribe(
              data => {
                this.initFoodSize();
                this.alerts.push({id: this.alertCounter, type:'danger',
                  message:'ADMIN.PRODUCT.DELETED', subMessage: ''});
                setTimeout((index) => this.closeAlertWithId(index) ,2500, this.alertCounter++);
              }, err => {
                this.alerts.push({id: this.alertCounter, type:'warning',
                  message:'ADMIN.PRODUCT.ERROR_DELETE', subMessage: ''});
                setTimeout((index) => this.closeAlertWithId(index) ,2500, this.alertCounter++);
              }
            );
          }
          this.productId = undefined;
        });
      }, err => {
        this.alerts.push({id: this.alertCounter, type:'secondary',
          message:'ADMIN.PRODUCT.NOT_FOUND', subMessage: ' ' + this.productId});
        setTimeout((index) => this.closeAlertWithId(index) ,2500, this.alertCounter++);
        this.searchingProductToDelete = false;
        this.productId = undefined;
      }
    );
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  closeAlertWithId(id: number) {
    const alert = this.alerts.find(a => a.id == id);
    const index = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  purgeDB(purge) {
    this.purgingCheck = false;
    this.modalService.open(purge).result.then((result) => {
      if (result === 'Cancel') {
        console.log('Stay here');
      } else if (result === 'Confirm') {
        //Purge it here
        this.alerts.push({id: this.alertCounter, type:'warning',
          message:'ADMIN.PURGE.DELETE', subMessage: ''});
        setTimeout((index) => this.closeAlertWithId(index) ,5000, this.alertCounter++);
        /*this.service.food.purgeProducts().subscribe(
          data => {
            this.initFoodSize();
            this.alerts.push({id: this.alertCounter, type:'danger',
              message:'ADMIN.PURGE.DELETED', subMessage: ''});
            setTimeout((index) => this.closeAlertWithId(index) ,5000, this.alertCounter++);
          }, err => {
            this.alerts.push({id: this.alertCounter, type:'warning',
              message:'ADMIN.PURGE.ERROR_DELETE', subMessage: ''});
            setTimeout((index) => this.closeAlertWithId(index) ,5000, this.alertCounter++);
          }
        );*/
      }
    });
  }

  onSaveProducts() {
    console.log("Save product");
  }
}
