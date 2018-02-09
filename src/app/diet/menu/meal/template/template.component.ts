import { Component, OnInit } from '@angular/core';
import {Meal} from '../../../../model/meal';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  templateMeals: Array<Meal> = [];

  constructor() { }

  ngOnInit() {
  }

}
