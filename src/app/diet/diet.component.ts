import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {NavItem} from "../model/nav-item";
import {AuthenticationService} from "../services/authentication.service";
import {Patient} from "../model/patient";
import {DietService} from "./service/diet.service";
import {isNullOrUndefined} from "util";
import {Dietetist} from "../model/dietetist";
import {SharedService} from "./service/shared.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
  private _opened: boolean = true;
  private foodItemItem: NavItem = {img: "../../assets/img/food.ico", title: "Food overview", routerLink: "/diet/food"};
  private aboutPatientItem: NavItem = {img: "../../assets/img/about.ico", title: "About Patient", routerLink: "/diet/detail-patient"};
  private selectPatientItem: NavItem = {img: "../../assets/img/select-patient.png", title: "Select Patient", routerLink: "/diet/select-patient"};
  private dashboardItem: NavItem = {img: "../../assets/img/dashboard.png", title: "Dashboard", routerLink: "/diet/dashboard"};
  private navItems: Array<NavItem> = new Array();
  private patient$: Observable<Patient>;
  private patientId: number;
  private selectedPatient: Patient;
  private diet: Dietetist;

  constructor(private authService: AuthenticationService,
              private dietService: DietService,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initDiet();
    this.initPatient();
    this.initNavItems();
  }

  initPatient() {
    this.patient$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.patientId = +params.get("patientId");
        return this.dietService.getPatient(this.patientId);
      });
    this.patient$.subscribe(data => {
      if(!isNullOrUndefined(data)) {
        const index: number = this.navItems.indexOf(this.aboutPatientItem);
        if(index <= 0)
          this.navItems.push(this.aboutPatientItem);
        this.selectedPatient = data;
        this.sharedService.setPatient(this.selectedPatient);
        console.log("Getting data: ", data);
      } else {
        console.log("Error with data: ", data);
      }
    }, err => {
        console.log(err);
        if(err instanceof HttpErrorResponse) {
          console.log("Httperror");
        } else {
          console.log("Not a httperror");
        }
    });
  }

  initDiet() {
    this.dietService.getConnectedUser().subscribe(
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

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
    this.router.navigate([item.routerLink], );
  }
}
