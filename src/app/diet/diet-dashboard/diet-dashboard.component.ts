import { Component, OnInit } from '@angular/core';
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";
import {SharedService} from "../service/shared.service";

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css']
})
export class DietDashboardComponent implements OnInit {

  private diet: Dietetist;
  private selectedPatient: Patient;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    //this.sharedService.diet.subscribe(data => this.diet = data);
    console.log("Init dashboard");
    this.sharedService.dietetist$.subscribe(data => {this.diet = data; console.log("Getting the diet");});
    this.sharedService.onSelectedPatient.subscribe(data => this.selectedPatient = data);
  }

  getJson(): string {
    return JSON.stringify(this.selectedPatient);
  }
}
