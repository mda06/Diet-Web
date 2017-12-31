import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css']
})
export class DietDashboardComponent implements OnInit, OnDestroy {

  private diet: Dietetist;
  private selectedPatient: Patient;
  private subscriptions = new Subscription();

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.subscriptions.add(this.sharedService.dietetist$.subscribe(
      data => {
        this.diet = data;
      })
    );
    this.subscriptions.add(this.sharedService.patient$.subscribe(
      data => {
        this.selectedPatient = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getJson(): string {
    return JSON.stringify(this.selectedPatient);
  }
}
