import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, Router} from "@angular/router";
import {NavItem} from "../model/nav-item";
import {Patient} from "../model/patient";
import {DietService} from "./service/diet.service";
import {isNullOrUndefined} from "util";
import {Dietetist} from "../model/dietetist";
import {SharedService} from "./service/shared.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
  _opened: boolean = true;
  private foodItemItem: NavItem =
    {img: "../../assets/img/food.ico", title: "NAV.FOOD_OVERVIEW", routerLink: "/diet/food"};
  private aboutPatientItem: NavItem =
    {img: "../../assets/img/about.ico", title: "NAV.ABOUT_PATIENT", routerLink: "/diet/detail-patient"};
  private selectPatientItem: NavItem =
    {img: "../../assets/img/select-patient.png", title: "NAV.SELECT_PATIENT", routerLink: "/diet/select-patient"};
  private dashboardItem: NavItem =
    {img: "../../assets/img/dashboard.png", title: "NAV.DASHBOARD", routerLink: "/diet/dashboard"};
  navItems: Array<NavItem> = [];
  private subscriptions = new Subscription();
  private selectedPatient: Patient;
  private diet: Dietetist;

  constructor(private dietService: DietService,
              private sharedService: SharedService,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initDiet();
    this.initPatient();
    this.initNavItems();
  }

  initPatient() {
    this.route.params.subscribe(params => {
      const id = +params['patientId'];
      if(id > 0) {
        this.dietService.getPatient(id).subscribe(data => {
          if(!isNullOrUndefined(data)) {
            const index: number = this.navItems.indexOf(this.aboutPatientItem);
            if(index <= 0)
              this.navItems.push(this.aboutPatientItem);
            //If we were subscribed to patients unsubscribe it now, we doesn't need it anymore
            this.subscriptions.unsubscribe();
            this.selectedPatient = data;
            this.sharedService.setPatient(this.selectedPatient);
            console.log("Getting data: ", data);
          } else {
            console.log("Error with data: ", data);
          }
        }, err => {
          console.log(err);
          if(err instanceof HttpErrorResponse) {
            console.log("Http error");
          } else {
            console.log("Not a http error");
          }
        });
      } else {
        //We came back form another route or elsewhere without any route param
        //Check if the shared service contains a patient
        this.subscriptions.add(this.sharedService.patient$.subscribe(
          data => {
            if(!isNullOrUndefined(data) && isNullOrUndefined(this.selectedPatient)) {
              this.selectedPatient = data;
            }
          })
        );
      }
    });
  }

  initDiet() {
    this.authService.getConnectedUser().subscribe(
      data => {
        this.diet = data;
        this.sharedService.setDietetist(data);
        },
      err => {console.log("Error trying to get the connected user");}
    );
  }

  initNavItems() {
    this.navItems.push(this.dashboardItem);
    this.navItems.push(this.foodItemItem);
    this.navItems.push(this.selectPatientItem);
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
    this.router.navigate([item.routerLink]);
  }
}
