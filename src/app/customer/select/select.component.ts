import {Component, OnDestroy, OnInit} from '@angular/core';
import { Patient } from "../../model/patient";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../diet/service/shared.service";

@Component({
  selector: 'app-select-customer',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnDestroy {

  patients: Array<Patient>;
  private subscriptions = new Subscription();
  selectedPatient: Patient;
  filter: String = "";
  currentPage = 1;
  patientsPerPage = 5;

  constructor(public translate: TranslateService,
              private sharedService: SharedService,
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
    this.router.navigate(['diet', { patientId: this.selectedPatient.id}]);
  }

  newPatient() {
    this.router.navigate(['diet/add-patient']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  switch(patient: Patient) {
    this.selectedPatient = patient;
  }

}
