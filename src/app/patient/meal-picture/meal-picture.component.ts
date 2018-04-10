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
  tempDate: Date = new Date();

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.initDateModel();
  }

  initDateModel() {
    this.model = { day: this.tempDate.getUTCDate(), month: this.tempDate.getUTCMonth() + 1, year: this.tempDate.getUTCFullYear()};
  }
  onDateChanged() {
    this.tempDate.setUTCFullYear(this.model.year, this.model.month - 1, this.model.day);
  }

  uploadFiles(event) {
    let formData = new FormData();
    for(let file of event.files) {
      formData.append("pictures", file, file.name);
    }

    this.upload.progress = 0;
    this.uploadService.addNewMealPictures(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.upload.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        const pictures : Array<MealPicture> = event.body;
        for(var pic in pictures)
          console.log(pic);
        this.upload.clear();
      }
    });
  }

}
