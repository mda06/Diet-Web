import {Component, OnInit, ViewChild} from '@angular/core';
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
    {img: "../../assets/img/food.ico", title: "NAV.FOOD_SEARCH", routerLink: "/diet/food", subMenus: []};
  private dashboardItem: NavItem =
    {img: "../../assets/img/dashboard.png", title: "NAV.DASHBOARD", routerLink: "/diet/dashboard", subMenus: []};

  private menuItem: NavItem =
    {img: "../../assets/img/menu.png", title: "NAV.MENU.TITLE", routerLink: "/diet/menu", subMenus: [
      {img: "../../assets/img/menu.png", title: "NAV.MENU.TITLE", routerLink: "/diet/menu", subMenus: []},
      {img: "../../assets/img/meal-template.png", title: "NAV.MENU.TEMPLATE", routerLink: "/diet/menu/template", subMenus: []}
    ]};

  private aboutPatientItem: NavItem =
    {img: "../../assets/img/about.ico", title: "NAV.PATIENT.ABOUT", routerLink: "/diet/detail-patient", subMenus: []};
  private selectPatientItem: NavItem =
    {img: "../../assets/img/select-patient.png", title: "NAV.PATIENT.SELECT", routerLink: "/diet/select-patient", subMenus: []};

  private patientItem: NavItem =
    {img: "../../assets/img/patient.png", title: "NAV.PATIENT.TITLE", routerLink: "/diet/select-patient", subMenus:
      [this.selectPatientItem]};

  navItems: Array<NavItem> = [];
  private subscriptions = new Subscription();
  private selectedPatient: Patient;
  private diet: Dietetist;

  @ViewChild('sidebar') sidebar;

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
            //If we were subscribed to patients unsubscribe it now, we doesn't need it anymore
            this.subscriptions.unsubscribe();
            this.selectedPatient = data;
            this.addPatientNav();
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

  private addPatientNav() {
    const index: number = this.patientItem.subMenus.indexOf(this.aboutPatientItem);
    if(index <= 0)
      this.patientItem.subMenus.push(this.aboutPatientItem);
    this.patientItem.routerLink = this.aboutPatientItem.routerLink;
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
    this.navItems.push(this.menuItem);
    this.navItems.push(this.patientItem);
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  navItemClicked(item: NavItem) {
    console.log("Navigate to %s", item.routerLink);
    this.sidebar.triggerRerender();
    this.router.navigate([item.routerLink]);
  }
}
