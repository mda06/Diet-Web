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
  selectedPatient: Patient;
  //filter: Patient = new Patient();
  filter: String = new String();

  constructor() { }

  ngOnInit() {
  }

  select() {
    this.selectPatient.emit(this.selectedPatient);
  }

  switch(patient: Patient) {
    this.selectedPatient = patient;
  }

}
