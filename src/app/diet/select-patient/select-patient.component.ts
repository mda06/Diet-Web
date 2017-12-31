import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Patient } from "../../model/patient";
import {isNullOrUndefined} from "util";
import {DietService} from "../service/diet.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit, OnDestroy {

  @Input() patients: Array<Patient>
  @Output() selectPatient = new EventEmitter<Patient>();
  @Output() addNewPatient = new EventEmitter();
  private subscriptions = new Subscription();
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
      this.subscriptions.add(this.sharedService.dietetist$.subscribe(
        data => {
          if(!isNullOrUndefined(data)) {
            this.patients = data.patients;
          }
        })
      );
    }

    this.subscriptions.add(this.sharedService.patient$.subscribe(
      data => {
        this.selectedPatient = data;
      })
    );
  }

  select() {
    this.router.navigate(['diet', { patientId: this.selectedPatient.id}], );
    //this.selectPatient.emit(this.selectedPatient);
  }

  newPatient() {
    //this.addNewPatient.emit();
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
