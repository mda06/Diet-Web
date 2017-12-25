import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Patient } from "../../model/patient";

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

  @Input() patients: Array<Patient>
  @Output() selectPatient = new EventEmitter<Patient>();

  constructor() { }

  ngOnInit() {
  }

  select(patient: Patient) {
    this.selectPatient.emit(patient);
  }

}
