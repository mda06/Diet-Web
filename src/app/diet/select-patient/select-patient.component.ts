import {Component, Input, OnInit} from '@angular/core';
import { Patient } from "../../model/patient";

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

  @Input() patients: Array<Patient>

  constructor() { }

  ngOnInit() {
  }

}
