import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Patient} from "../../model/patient";
import {DetailReturn} from "./detail-return";

const now = new Date();

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  @Input() patient: Patient;
  @Output() detailReturn = new EventEmitter<DetailReturn>();
  public isAddressCollapsed = true;
  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(/*private route: ActivatedRoute,
              private dietService: DietService*/) { }

  ngOnInit() {
    /*if(isNullOrUndefined(this.patient)) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.dietService.getPatient(id).subscribe(
        data => this.patient = data
      );
    }*/
    console.log(this.patient.birthday);
    this.model = { day: this.patient.birthday.getUTCDate(), month: this.patient.birthday.getUTCMonth() + 1,
      year: this.patient.birthday.getUTCFullYear()};
    console.log(this.model);
  }

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  birthdayChange() {
    this.patient.birthday.setUTCFullYear(this.model.year, this.model.month - 1, this.model.day);
    console.log(this.patient);
    console.log(this.model);
  }

  goBack() {
    this.detailReturn.emit(DetailReturn.BACK);
  }

}
