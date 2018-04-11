import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UploadFileService} from '../../services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MealPicture} from '../../model/mealpicture';

@Component({
  selector: 'app-meal-picture',
  templateUrl: './meal-picture.component.html',
  styleUrls: ['./meal-picture.component.css']
})
export class MealPictureComponent implements OnInit {

  @ViewChild('fileUpload') upload: any;
  model: NgbDateStruct;
  mealDate: Date = new Date();

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.initDateModel();
  }

  initDateModel() {
    this.model = { day: this.mealDate.getUTCDate(), month: this.mealDate.getUTCMonth() + 1, year: this.mealDate.getUTCFullYear()};
  }
  onDateChanged() {
    this.mealDate.setUTCFullYear(this.model.year, this.model.month - 1, this.model.day);
  }

  uploadFiles(event) {
    this.upload.progress = 0;
    this.uploadService.addNewMealPictures(event.files, this.mealDate).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.upload.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        const pictures : Array<MealPicture> = event.body;
        console.log(pictures);
        this.upload.clear();
      }
    });
  }

}
