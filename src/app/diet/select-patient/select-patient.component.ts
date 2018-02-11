import {Component, OnDestroy, OnInit} from '@angular/core';
import { Patient } from "../../model/patient";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit, OnDestroy {

  patients: Array<Patient>;
  selectedPatient: Patient;
  private subscriptions = new Subscription();

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

  onSelectedCustomer(patient: Patient) {
    this.router.navigate(['diet', { patientId: patient.id}]);
  }

  onAddCustomer() {
    this.router.navigate(['diet/add-patient']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
