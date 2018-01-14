import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Patient} from "../../model/patient";
import {AnthropometricParameter} from "../../model/anthropometricParameter";
import {Gender} from "../../model/gender";
import {DietService} from "../service/diet.service";
import {IAlert} from "../../model/i-alert";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
import * as _ from 'lodash';
import * as moment from 'moment';
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";

const now = new Date();

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit, OnDestroy {

  patient: Patient;
  private copyPatient: Patient;
  private subscriptions = new Subscription();
  isAddPatient: boolean = false;
  param: AnthropometricParameter;
  public isAddressCollapsed = true;
  model: NgbDateStruct;
  public genders = this.enumSelector(Gender);
  public alerts: Array<IAlert> = [];
  alertCounter: number = 0;

  constructor(
    public translate: TranslateService,
    private dietService: DietService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
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
    const id = +this.route.snapshot.paramMap.get('id');
    //If the request is by id
    if(id != 0) {
      this.subscriptions.add(this.dietService.getPatient(id).subscribe(
        data => {
          if(!isNullOrUndefined(data)) {
            this.patient = data;
            this.initDateModel();
            this.initPatientBackup();
          }
        }
      ));
    } else {
      //If the request is by shared context
      this.subscriptions.add(this.sharedService.patient$.subscribe(
        data => {
          this.patient = data;
        })
      );
    }

    if(!isNullOrUndefined(this.patient)) {
      this.param = new AnthropometricParameter();
      this.initDateModel();
      this.initPatientBackup();
    }
  }

  initDateModel() {
    this.model = { day: this.patient.birthday.getUTCDate(), month: this.patient.birthday.getUTCMonth() + 1,
      year: this.patient.birthday.getUTCFullYear()};
  }

  initPatientBackup() {
    //Copy patient for ui approvement (is patient modified)
    this.copyPatient = _.cloneDeep(this.patient);
  }

  enumSelector(definition) {
    return Object.keys(definition)
      .map(key => ({ value: definition[key], title: key }));
  }

  selectToday() {
    return "Today: " + now.getUTCFullYear()+ "-" + (now.getUTCMonth()+1) + "-" + now.getUTCDate();
  }

  getFormattedDate(date: Date): string {
    return moment(date).format("DD/MM/YYYY");
  }

  isPatientModified() {
    return !_.isEqual(this.copyPatient, this.patient);
  }

  addParam() {
    this.param.date = now;
    this.param.id = undefined;
    this.param.patientId = this.patient.id;
    this.patient.anthropometricParameters.push(this.param);
    this.param = new AnthropometricParameter();
  }

  birthdayChange() {
    this.patient.birthday.setUTCFullYear(this.model.year, this.model.month - 1, this.model.day);
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
    this.alerts.push({id: this.alertCounter, type:'secondary', message:'DIET.DETAIL.ALERT.SAVING ' + this.patient.firstName});
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
        this.alerts.push({id: this.alertCounter, type:'success', message:'DIET.DETAIL.ALERT.SAVED ' + this.patient.firstName});
        setTimeout((index) => {
          this.closeAlertWithId(index);
        },1500, this.alertCounter++);
        },
      err => {
        console.log("Error"); console.log(err);
        this.alerts.push({id: this.alertCounter, type:'danger', message:'DIET.DETAIL.ALERT.ERROR ' + this.patient.firstName});
        setTimeout((index) => {
          this.closeAlertWithId(index);
        },1500, this.alertCounter++);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
