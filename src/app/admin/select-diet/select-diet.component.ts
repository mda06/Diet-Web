import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs/Subscription";
import {Dietetist} from "../../model/dietetist";
import {AdminService} from "../service/admin.service";

@Component({
  selector: 'app-select-diet',
  templateUrl: './select-diet.component.html',
  styleUrls: ['./select-diet.component.css']
})
export class SelectDietComponent  implements OnInit, OnDestroy {

  diets: Array<Dietetist>;
  private subscriptions = new Subscription();

  constructor(private service: AdminService,
              private router: Router,
              public translate: TranslateService) {
  }

  ngOnInit() {
    this.subscriptions.add(this.service.getDietetists().subscribe(data => {
      this.diets = data;
      console.log(data);
    }, err => console.log(err)));
  }

  onSelectedCustomer(diet: Dietetist) {
    console.log("Details diet");
    this.subscriptions.add(this.service.getDietetist(diet.id).subscribe(data => {
      console.log(data);
    }, err => console.log(err)));
    //this.router.navigate(['diet', { patientId: patient.id}]);
  }

  onAddCustomer() {
    console.log("Add Diet");
    //this.router.navigate(['diet/add-patient']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
