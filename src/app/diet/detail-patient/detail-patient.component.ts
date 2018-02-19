import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {Patient} from "../../model/patient";
import {AnthropometricParameter} from "../../model/anthropometricParameter";
import {DietService} from "../service/diet.service";
import {IAlert} from "../../model/i-alert";
import {isNullOrUndefined} from "util";
import * as _ from 'lodash';
import * as moment from 'moment';
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

const now = new Date();

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit, OnDestroy {

  patient: Patient;
  private copyPatient: Patient;
  isAddPatient: boolean = false;
  param: AnthropometricParameter;
  private subscriptions = new Subscription();
  public alerts: Array<IAlert> = [];
  alertCounter: number = 0;

  constructor(
    public translate: TranslateService,
    private dietService: DietService,
    private sharedService: SharedService,
    private location: Location,
    private modalService: NgbModal) { }

  ngOnInit() {
    if(this.location.path().indexOf('detail') >= 0) {
      this.initDetailPatient();
    } else if(this.location.path().indexOf('add') >= 0) {
      this.initAddPatient();
    }
  }

  initAddPatient() {
    this.param = new AnthropometricParameter();
    this.patient = new Patient();
    this.isAddPatient = true;
  }

  initDetailPatient() {
    //If the request is by shared context
    this.subscriptions.add(this.sharedService.patient$.subscribe(
      data => {
        if(!isNullOrUndefined(data)) {
          this.patient = data;
          this.param = new AnthropometricParameter();
          this.initPatientBackup();
        }
      })
    );
  }

  initPatientBackup() {
    //Copy patient for ui approvement (is patient modified)
    this.copyPatient = _.cloneDeep(this.patient);
  }

  selectToday() {
    return "Today: " + now.getUTCFullYear()+ "-" + (now.getUTCMonth()+1) + "-" + now.getUTCDate();
  }

  getFormattedDate(date: Date): string {
    return moment(date).format("DD/MM/YYYY");
  }

  isPatientModified() {
    if(!isNullOrUndefined(this.copyPatient) && !isNullOrUndefined(this.patient))
      this.copyPatient.authId = this.patient.authId;
    return !_.isEqual(this.copyPatient, this.patient);
  }

  addParam() {
    this.param.date = now;
    console.log(now);
    this.param.id = undefined;
    this.param.patientId = this.patient.id;
    this.patient.anthropometricParameters.push(this.param);
    this.param = new AnthropometricParameter();
  }

  goBack(content) {
    if(this.isPatientModified()) {
      this.modalService.open(content).result.then((result) => {
        if (result === 'Cancel') {
          console.log('Stay here');
        } else if (result === 'Return') {
          //Restore patient like it was before
          _.merge(this.patient, this.copyPatient);
          //Go back
          this.location.back();
        }
      });
    } else {
      this.location.back();
    }
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

  save() {
    this.alerts.push({id: this.alertCounter, type:'secondary',
      message:'DIET.DETAIL.ALERT.SAVING', subMessage: this.patient.firstName});
    setTimeout((index) => {
      this.closeAlertWithId(index);
      },1500, this.alertCounter++);
    console.log(this.patient);
    this.dietService.savePatient(this.patient).subscribe(
      data => {
        if(this.isAddPatient) {
          this.patient = _.merge(this.patient, data);
          this.subscriptions.add(this.sharedService.dietetist$.subscribe(
            data => {
              if(!isNullOrUndefined(data)) {
                data.patients.push(this.patient);
              }
            })
          );
          this.isAddPatient = false;
        } else {
          //Patient is saved
        }
        this.initPatientBackup();
        this.alerts.push({id: this.alertCounter, type:'success',
          message:'DIET.DETAIL.ALERT.SAVED', subMessage: this.patient.firstName});
        setTimeout((index) => {
          this.closeAlertWithId(index);
        },1500, this.alertCounter++);
        },
      err => {
        console.log("Error"); console.log(err);
        this.alerts.push({id: this.alertCounter, type:'danger',
          message:'DIET.DETAIL.ALERT.ERROR', subMessage: this.patient.firstName});
        setTimeout((index) => {
          this.closeAlertWithId(index);
        },1500, this.alertCounter++);
      }
    );
  }

  onDeleteParam(param: AnthropometricParameter) {
    const index: number = this.patient.anthropometricParameters.indexOf(param);
    this.patient.anthropometricParameters.splice(index, 1);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
