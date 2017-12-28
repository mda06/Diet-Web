import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Patient} from "../../model/patient";
import {DetailReturn} from "./detail-return";
import {AnthropometricParameter} from "../../model/anthropometricParameter";
import {Gender} from "../../model/gender";
import {DietService} from "../../services/diet.service";
import {IAlert} from "../../model/i-alert";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";

const now = new Date();

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  @Input() patient: Patient;
  @Output() detailReturn = new EventEmitter<DetailReturn>();
  private copyPatient: Patient;
  param: AnthropometricParameter;
  public isAddressCollapsed = true;
  model: NgbDateStruct;
  public genders = this.enumSelector(Gender);
  public alerts: Array<IAlert> = [];

  constructor(
    private dietService: DietService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id != 0) {
      this.dietService.getPatient(id).subscribe(
        data => {
          if(!isNullOrUndefined(data)) {
            this.patient = data;
            this.initDateModel();
          }
        }
      );
    }

    this.param = new AnthropometricParameter();
    if(!isNullOrUndefined(this.patient))
      this.initDateModel();
  }

  initDateModel() {
    this.model = { day: this.patient.birthday.getUTCDate(), month: this.patient.birthday.getUTCMonth() + 1,
      year: this.patient.birthday.getUTCFullYear()};


    this.copyPatient = (JSON.parse(JSON.stringify(this.patient)));
    console.log(this.copyPatient);
    console.log(this.patient);
  }

  enumSelector(definition) {
    return Object.keys(definition)
      .map(key => ({ value: definition[key], title: key }));
  }

  selectToday() {
    return "Today: " + now.getUTCFullYear()+ "-" + (now.getUTCMonth()+1) + "-" + now.getUTCDate();
  }

  addParam() {
    this.param.date = now;
    this.param.patientId = this.patient.id;
    this.patient.anthropometricParameters.push(this.param);
    this.param = new AnthropometricParameter();
  }

  birthdayChange() {
    this.patient.birthday.setUTCFullYear(this.model.year, this.model.month - 1, this.model.day);
    console.log(this.copyPatient);
    console.log(this.patient);
  }

  goBack() {
    //If there's at least 1 observer it means that it's inside a component and not requested directly in the url
    //Else it's requested from the url and we go back
    if(this.detailReturn.observers.length >= 1)
      this.detailReturn.emit(DetailReturn.BACK);
    else
      this.location.back();
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  save() {
    this.detailReturn.emit(DetailReturn.SAVE);
    this.alerts.push({id: 0, type:'secondary', message:'Saving ' + this.patient.firstName});
    console.log("Saving the patient");
    console.log(this.patient);
    this.dietService.savePatient(this.patient).subscribe(
      data => {
        console.log("Patient saved");
        console.log(data);
        this.alerts.push({id: 1, type:'success', message:'Saved ' + this.patient.firstName});
        },
      err => {
        console.log("Error"); console.log(err);
        this.alerts.push({id: 2, type:'danger', message:'Error cannot save ' + this.patient.firstName});
      }
    );
  }
}
