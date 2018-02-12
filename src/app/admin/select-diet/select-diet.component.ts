import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Dietetist} from "../../model/dietetist";
import {AdminService} from "../service/admin.service";

@Component({
  selector: 'app-select-diet',
  templateUrl: './select-diet.component.html',
  styleUrls: ['./select-diet.component.css']
})
export class SelectDietComponent  implements OnInit {

  diets: Array<Dietetist>;

  constructor(private service: AdminService,
              private router: Router,
              public translate: TranslateService) {
  }

  ngOnInit() {
    this.service.getDietetists().subscribe(data => {
      this.diets = data;
    }, err => console.log(err));
  }

  onSelectedCustomer(diet: Dietetist) {
    this.router.navigate(['/admin/detail-diet', diet.id]);
  }

  onAddCustomer() {
    this.router.navigate(['/admin/add-diet']);
  }

}
