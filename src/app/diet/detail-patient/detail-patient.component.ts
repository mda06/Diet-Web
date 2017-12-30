import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

const now = new Date();

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  @Input() patient: Patient;
  private copyPatient: Patient;
  @Output() back = new EventEmitter();
  @Output() patientSaved = new EventEmitter();
  @Output() patientAdded = new EventEmitter<Patient>();
  isAddPatient: boolean = false;
  param: AnthropometricParameter;
  public isAddressCollapsed = true;
  model: NgbDateStruct;
  public genders = this.enumSelector(Gender);
  public alerts: Array<IAlert> = [];
  alertCounter: number = 0;

  constructor(
    private dietService: DietService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id != 0) {
      this.dietService.getPatient(id).subscribe(
        data => {
          if(!isNullOrUndefined(data)) {
            this.patient = data;
            this.initDateModel();
            this.initPatientBackup();
          }
        }
      );
    }

    if(isNullOrUndefined(this.patient)) {
      this.patient = new Patient();
      this.isAddPatient = true;
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
          //If there's at least 1 observer it means that it's inside a component and not requested directly in the url
          //Else it's requested from the url and we go back
          /*if (this.back.observers.length >= 1) {
            this.handleBack();
          } else {
            //No need to restore the patient because it's referencing nowhere
            this.location.back();
          }*/
          this.location.back();
        }
      });
    } else {
      //this.handleBack();
      this.location.back();
    }
  }

  handleBack() {
    //Restore patient like it was before
    _.merge(this.patient, this.copyPatient);
    //Go back
    this.back.emit();
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
    this.alerts.push({id: this.alertCounter, type:'secondary', message:'Saving ' + this.patient.firstName});
    setTimeout((index) => {
      this.closeAlertWithId(index);
      },1500, this.alertCounter++);
    console.log(this.patient);
    this.dietService.savePatient(this.patient).subscribe(
      data => {
        if(this.isAddPatient) {
          this.patient = _.merge(this.patient, data);
          this.patientAdded.emit(this.patient);
          this.isAddPatient = false;
        } else {
          this.patientSaved.emit(this.patient);
        }
        this.initPatientBackup();
        this.alerts.push({id: this.alertCounter, type:'success', message:'Saved ' + this.patient.firstName});
        setTimeout((index) => {
          this.closeAlertWithId(index);
        },1500, this.alertCounter++);
        },
      err => {
        console.log("Error"); console.log(err);
        this.alerts.push({id: this.alertCounter, type:'danger', message:'Error cannot save ' + this.patient.firstName});
        setTimeout((index) => {
          this.closeAlertWithId(index);
        },1500, this.alertCounter++);
      }
    );
  }
}
