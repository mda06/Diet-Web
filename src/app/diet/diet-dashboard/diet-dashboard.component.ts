import { Component, OnInit } from '@angular/core';
import { DietService } from "../../services/diet.service";
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";
import {DetailReturn} from "../detail-patient/detail-return";

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css']
})
export class DietDashboardComponent implements OnInit {

  private diet: Dietetist;
  private selectedPatient: Patient;

  constructor(private dietService: DietService) { }

  ngOnInit() {
    this.dietService.getConnectedUser().subscribe(
      data => {this.diet = data;},
      err => {console.log("Error trying to get the connected user");}
    );
  }

  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
    console.log("Selected patient: " + patient.firstName);
  }

  detailReturn(detailReturn: DetailReturn) {
    if(detailReturn === DetailReturn.BACK) {
      this.selectedPatient = null;
    } else {

    }
  }

}
