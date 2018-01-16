import {Component, OnInit} from '@angular/core';
import {AdminService} from "../service/admin.service";
import {Product} from "../../model/product";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IAlert} from "../../model/i-alert";
import {HttpEventType, HttpResponse} from "@angular/common/http";

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

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private service: AdminService,
              private translateService: TranslateService,
              private modalService: NgbModal) {}

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

            this.addAlert('warning', 'ADMIN.PRODUCT.DELETE', ' ' + this.productId);
            this.service.food.deleteProduct(this.productId).subscribe(
              data => {
                this.initFoodSize();
                this.addAlert('danger', 'ADMIN.PRODUCT.DELETED', '');
              }, err => {
                this.addAlert('warning', 'ADMIN.PRODUCT.ERROR_DELETE', '');
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
        this.addAlert('danger', 'ADMIN.PURGE.DELETE', '');
        /*this.service.food.purgeProducts().subscribe(
          data => {
            this.initFoodSize();
            this.addAlert('danger', 'ADMIN.PURGE.DELETED', '');
          }, err => {
            this.addAlert('warning', 'ADMIN.PURGE.ERROR_DELETE', '');
          }
        );*/
      }
    });
  }

  private addAlert(type: string, msg: string, subMsg: string) {
    this.alerts.push({id: this.alertCounter, type:type, message:msg, subMessage: subMsg});
    setTimeout((index) => this.closeAlertWithId(index) ,5000, this.alertCounter++);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.service.food.batch(this.currentFileUpload).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
          console.log(this.progress.percentage);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.addAlert('primary', 'ADMIN.UPLOAD.DONE', '');
          this.currentFileUpload = undefined;
          console.log(event);
        }}, err => {
          console.log(event);
          console.log("Error baby");
          this.currentFileUpload = undefined;
          this.addAlert('danger', 'ADMIN.UPLOAD.ERROR', '');
      });

    this.selectedFiles = undefined;
  }
}
