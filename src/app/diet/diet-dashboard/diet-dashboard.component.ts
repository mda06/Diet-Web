import { Component, OnInit } from '@angular/core';
import { DietService } from "../../services/diet.service";
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";
import {NavItem} from "../../model/nav-item";

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css']
})
export class DietDashboardComponent implements OnInit {

  private diet: Dietetist;
  private selectedPatient: Patient;
  private displayAddNewPatient = false;

  constructor(private dietService: DietService) { }

  ngOnInit() {
    this.dietService.getConnectedUser().subscribe(
      data => {this.diet = data;},
      err => {console.log("Error trying to get the connected user");}
    );
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
  }

  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
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
