import { Component, OnInit } from '@angular/core';
import { DietService } from "../../services/diet.service";
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css']
})
export class DietDashboardComponent implements OnInit {

  private diet: Dietetist;
  private selectedPatient: Patient;
  private displayAddNewPatient = false;
  private _opened: boolean = true;

  constructor(private dietService: DietService) { }

  ngOnInit() {
    this.dietService.getConnectedUser().subscribe(
      data => {this.diet = data;},
      err => {console.log("Error trying to get the connected user");}
    );
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
    console.log("Selected patient: " + patient.firstName);
  }

  addNewPatient() {
    this.displayAddNewPatient = true;
  }

  patientAdded(patient: Patient) {
    this.diet.patients.push(patient);
  }

  patientSaved(patient: Patient) {
    console.log();
  }

  backFromDetail() {
    this.displayAddNewPatient = false;
    this.selectedPatient = null;
  }

}
