import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Patient} from "../../model/patient";
import {DetailReturn} from "./detail-return";
import {AnthropometricParameter} from "../../model/anthropometricParameter";
import {Gender} from "../../model/gender";

const now = new Date();

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  @Input() patient: Patient;
  @Output() detailReturn = new EventEmitter<DetailReturn>();
  param: AnthropometricParameter;
  public isAddressCollapsed = true;
  model: NgbDateStruct;
  public genders = this.enumSelector(Gender);

  constructor(/*private route: ActivatedRoute,
              private dietService: DietService*/) { }

  ngOnInit() {
    /*if(isNullOrUndefined(this.patient)) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.dietService.getPatient(id).subscribe(
        data => this.patient = data
      );
    }*/
    this.param = new AnthropometricParameter();
    console.log(this.patient.birthday);
    this.model = { day: this.patient.birthday.getUTCDate(), month: this.patient.birthday.getUTCMonth() + 1,
      year: this.patient.birthday.getUTCFullYear()};
    console.log(this.model);
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
    console.log(this.patient);
    console.log(this.model);
  }

  goBack() {
    this.detailReturn.emit(DetailReturn.BACK);
  }

  save() {
    this.detailReturn.emit(DetailReturn.SAVE);
  }
}
