import {Component, OnDestroy, OnInit} from '@angular/core';
import { Patient } from "../../model/patient";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit, OnDestroy {

  patients: Array<Patient>
  private subscriptions = new Subscription();
  selectedPatient: Patient;
  filter: String = new String();
  currentPage = 1;
  patientsPerPage = 5;

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscriptions.add(this.sharedService.dietetist$.subscribe(
      data => {
        if(!isNullOrUndefined(data)) {
          this.patients = data.patients;
        }
      })
    );

    this.subscriptions.add(this.sharedService.patient$.subscribe(
      data => {
        this.selectedPatient = data;
      })
    );
  }

  select() {
    this.router.navigate(['diet', { patientId: this.selectedPatient.id}], );
  }

  newPatient() {
    this.router.navigate(['diet/add-patient']);
  }

  ngOnDestroy() {
    console.log("Unsubscribe from select");
    this.subscriptions.unsubscribe();
  }

  switch(patient: Patient) {
    this.selectedPatient = patient;
  }

}
