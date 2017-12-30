import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Patient } from "../../model/patient";
import {isNullOrUndefined} from "util";
import {DietService} from "../service/diet.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {SharedService} from "../service/shared.service";

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

  constructor(private dietService: DietService,
              private sharedService: SharedService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    if(isNullOrUndefined(this.patients)) {
      this.authService.getId().subscribe(id => {
        this.dietService.getPatientsOfDiet(id).subscribe(data => this.patients = data);
      }, err => console.log("Error getting the id"));
    }

    this.sharedService.onSelectedPatient.subscribe((data) => {
      this.selectedPatient = data; console.log("New patient on select");
    });
  }

  select() {
    this.router.navigate(['diet', { patientId: this.selectedPatient.id}], );
    //this.selectPatient.emit(this.selectedPatient);
  }

  newPatient() {
    //this.addNewPatient.emit();
    this.router.navigate(['diet/add-patient']);
  }

  switch(patient: Patient) {
    this.selectedPatient = patient;
  }

}
