import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {AdminService} from "../service/admin.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Dietetist} from "../../model/dietetist";
import {IAlert} from "../../model/i-alert";
import {ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-detail-diet',
  templateUrl: './detail-diet.component.html',
  styleUrls: ['./detail-diet.component.css']
})
export class DetailDietComponent implements OnInit {

  diet: Dietetist;
  private copyDiet: Dietetist;
  isAddDiet: boolean = false;
  public alerts: Array<IAlert> = [];
  alertCounter: number = 0;

  constructor(
    public translate: TranslateService,
    private service: AdminService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal) { }

  ngOnInit() {
    if(this.location.path().indexOf('detail') >= 0) {
      this.initDetailDiet();
    } else if(this.location.path().indexOf('add') >= 0) {
      this.initAddDiet();
    }
  }

  private initAddDiet() {
    this.diet = new Dietetist();
    this.isAddDiet = true;
  }

  private initDetailDiet() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id != 0) {
      this.service.getDietetist(id).subscribe(data => {
        this.diet = data;
        this.initDietCopy();
        console.log(data);
      }, err => console.log(err));
    }
  }

  private initDietCopy() {
    this.copyDiet = _.cloneDeep(this.diet);
  }

  isDietModified() {
    return !_.isEqual(this.copyDiet, this.diet);
  }
  goBack(content) {
    if(this.isDietModified()) {
      this.modalService.open(content).result.then((result) => {
        if (result === 'Cancel') {
          console.log('Stay here');
        } else if (result === 'Return') {
          //Restore diet like it was before
          _.merge(this.diet, this.copyDiet);
          //Go back
          this.location.back();
        }
      });
    } else {
      this.location.back();
    }
  }

  closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  private closeAlertWithId(id: number) {
    const alert = this.alerts.find(a => a.id == id);
    const index = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  private pushAlert(alert: IAlert) {
    this.alerts.push(alert);
    setTimeout((index) => this.closeAlertWithId(index),1500, this.alertCounter++);
  }

  save() {
    this.pushAlert({
      id: this.alertCounter, type:'secondary', message:'ADMIN.DETAIL.ALERT.SAVING', subMessage: this.diet.firstName
    });
    this.service.saveDietetist(this.diet).subscribe(
      data => {
        if(this.isAddDiet) {
          this.diet = _.merge(this.diet, data);
          this.isAddDiet = false;
        } else {
          //Diet is saved
        }
        this.initDietCopy();
        this.pushAlert({
          id: this.alertCounter, type:'success', message:'ADMIN.DETAIL.ALERT.SAVED', subMessage: this.diet.firstName
        });
      },
      err => {
        console.log("Error"); console.log(err);
        this.pushAlert({
          id: this.alertCounter, type:'danger', message:'ADMIN.DETAIL.ALERT.ERROR', subMessage: this.diet.firstName
        });
      }
    );
  }
}
