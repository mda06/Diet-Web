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
  private _opened: boolean = true;
  private navItems: Array<NavItem> = [
    {img: "../../assets/img/food.ico", title: "Food overview", routerLink: "/diet/food"},
    {img: "../../assets/img/about.ico", title: "About Patient", routerLink: "/diet/detail-patient/1"},
    {img: "../../assets/img/dashboard.png", title: "Dashboard", routerLink: "/diet/dashboard"}
    ];

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
