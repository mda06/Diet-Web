import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Patient} from "../../../model/patient";
import {SharedService} from "../../service/shared.service";
import {isNullOrUndefined} from "util";
import {MenuService} from "../../menu/service/menu.service";
import {TranslateService} from "@ngx-translate/core";
import {ReportService} from "../../service/report.service";
import {MenuReport} from "../../../model/menureport";
import * as moment from 'moment';

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.css']
})
export class FoodInfoComponent implements OnInit, OnDestroy {

  selectedPatient: Patient;
  private subscriptions = new Subscription();
  menusReport: Array<MenuReport> = [];

  constructor(private sharedService: SharedService,
              private reportsService: ReportService,
              private menuService: MenuService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.subscriptions.add(this.sharedService.patient$.subscribe(
      data => {
        if(!isNullOrUndefined(data)) {
          this.selectedPatient = data;
          this.menusReport = [];
          this.menuService.getMenusByPatientId(data.id).subscribe(data => {
            console.log("There are ", data.length, " menus");
            data.forEach(menu => {
              this.reportsService.getReportOfMenu(menu.id, this.translate.currentLang).subscribe(data => {
                if(data.micros.length != 0 || data.micros.length != 0)
                  this.menusReport.push(data);
              }, err => console.log(err));
            });
          });
        }
      })
    );
  }

  getFormattedDate(date: Date): string {
    return moment(date).format("DD/MM/YYYY");
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
