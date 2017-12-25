import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../model/patient";

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  @Input() patient: Patient;

  constructor() { }

  ngOnInit() {
  }

}
