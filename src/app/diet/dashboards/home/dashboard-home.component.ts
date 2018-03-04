import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";
import {IDashboardItem} from "../../../model/dashboardItem";
import {FoodInfoComponent} from "../food-info/food-info.component";
import {PatientInfoComponent} from "../patient-info/patient-info.component";
import {FoodSliderComponent} from "../food-slider/food-slider.component";
import {Dietetist} from "../../../model/dietetist";
import {SharedService} from "../../service/shared.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  foodItem: IDashboardItem = {component: FoodInfoComponent, rowStart: 3, colStart: 5, rowEnd: 5, colEnd: 10, title: "Food Info"};
  patientItem: IDashboardItem = {component: PatientInfoComponent, rowStart: 1, colStart: 1, rowEnd: 6, colEnd: 5, title: "Patient Info"};
  foodSlider: IDashboardItem = {component: FoodSliderComponent, rowStart: 1, colStart: 5, rowEnd: 3, colEnd: 10, title: "Food slider"};
  items = [this.foodItem, this.patientItem, this.foodSlider];

  diet: Dietetist;
  private subscriptions = new Subscription();

  constructor(public translate: TranslateService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.subscriptions.add(this.sharedService.dietetist$.subscribe(
      data => {
        this.diet = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
