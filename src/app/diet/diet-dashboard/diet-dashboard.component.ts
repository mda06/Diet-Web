import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dietetist} from "../../model/dietetist";
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";
import {IDashboardItem} from '../../model/dashboardItem';

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css']
})
export class DietDashboardComponent implements OnInit, OnDestroy {

  foodItem: IDashboardItem = {id:1, rowStart: 1, colStart: 1, rowEnd: 4, colEnd: 5, title: "Food Info"};
  patientItem: IDashboardItem = {id:2, rowStart: 1, colStart: 5, rowEnd: 3, colEnd: 10, title: "Patient Info"};
  foodSlider: IDashboardItem = {id:3, rowStart: 3, colStart: 5, rowEnd: 4, colEnd: 10, title: "Food slider"};
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
