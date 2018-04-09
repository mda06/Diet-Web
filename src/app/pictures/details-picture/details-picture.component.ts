import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-details-picture',
  templateUrl: './details-picture.component.html',
  styleUrls: ['./details-picture.component.css']
})
export class DetailsPictureComponent implements OnInit {

  @Input() fileUpload: string;

  constructor() { }

  ngOnInit() {
  }

}
