import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UploadFileService} from '../../services/upload-file.service';

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

    this.uploadService.addNewMealPictures(formData).subscribe(s => {
      console.log(s);
      this.upload.clear();
    });
    //Set the progress bar
    //this.upload.progress = Math.round((e.loaded * 100) / e.total);

    //Know the progress
    /*
    *  this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })

    this.selectedFiles = undefined
    * */
  }

}
