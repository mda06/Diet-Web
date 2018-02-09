import { Component, OnInit } from '@angular/core';
import {Meal} from '../../../../model/meal';
import {MenuService} from '../../service/menu.service';
import {AuthenticationService} from '../../../../services/authentication.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  templateMeals: Array<Meal> = [];

  constructor(private service: MenuService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.id.subscribe(id => {
      this.service.getMealByDietId(id).subscribe(data => {
        this.templateMeals = data;
      }, err => console.log(err));
    });
  }

}
