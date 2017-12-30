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
  @Output() addNewPatient = new EventEmitter();
  selectedPatient: Patient;
  filter: String = new String();
  currentPage = 1;
  patientsPerPage = 5;

  constructor() {
  }

  ngOnInit() {
  }

  select() {
    this.selectPatient.emit(this.selectedPatient);
  }

  newPatient() {
    this.addNewPatient.emit();
  }

  switch(patient: Patient) {
    this.selectedPatient = patient;
  }

  getCollectionSize(): number {
    return (this.patients.length / this.patientsPerPage);
  }

}
