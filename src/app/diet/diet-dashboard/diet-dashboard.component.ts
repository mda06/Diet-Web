import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs/Subscription";
import * as moment from 'moment';
import {isNullOrUndefined} from "util";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {IDashboardItem} from '../../model/dashboardItem';
import {
  DynamicSample1Component, DynamicSample2Component,
  UnknownDynamicComponent
} from "../dashboards/DynamicContentComponent";

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './diet-dashboard.component.html',
  styleUrls: ['./diet-dashboard.component.css']
})
export class DietDashboardComponent implements OnInit, OnDestroy {

  foodItem: IDashboardItem = {rowStart: 1, colStart: 1, rowEnd: 4, colEnd: 5, title: "Food Info"};
  patientItem: IDashboardItem = {rowStart: 1, colStart: 5, rowEnd: 3, colEnd: 10, title: "Patient Info"};
  foodSlider: IDashboardItem = {rowStart: 3, colStart: 5, rowEnd: 4, colEnd: 10, title: "Food slider"};

  diet: Dietetist;
  selectedPatient: Patient;
  private subscriptions = new Subscription();

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ["Length", "Weight"];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [180, 95], label: '12 Nov 2017'},
    {data: [181, 90], label: '12 Dec 2017'}
  ];

  contents = ["sample1", "sample2", "sample3"];

  addMore() {
    this.contents.push("sample1");
  }

  constructor(public translate: TranslateService,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.subscriptions.add(this.sharedService.dietetist$.subscribe(
      data => {
        this.diet = data;
      })
    );
    this.subscriptions.add(this.sharedService.patient$.subscribe(
      data => {
        if(!isNullOrUndefined(data)) {
          this.selectedPatient = data;
          /*let clone = _.clone(this.barChartData);
          console.log(this.barChartData);
          console.log(clone);
          let values = [];*/
          //this.barChartData.splice(0, this.barChartData.length);
          //this.barChartLabels.splice(0, this.barChartLabels.length);
          for(var param of this.selectedPatient.anthropometricParameters) {
            //values.push({data:[param.length, param.weight],
              //label:moment(param.date).format("DD/MM/YYYY")});
          }

          /*let clone = JSON.parse(JSON.stringify(this.barChartData));
          for(var row of clone) {

          }
          clone[0].data = values[0].data;
          clone[0].label = values[0].label;
          this.barChartData = clone;*/
        }
      })
    );
  }

  onPatientDeselect() {
    this.sharedService.setPatient(null);
    this.selectedPatient = null;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getAge(): number {
    return moment().diff(this.selectedPatient.birthday, 'years',false);
  }
}
