import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UploadFileService} from '../../services/upload-file.service';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {MealPicture} from '../../model/mealpicture';
import {IAlert} from '../../model/i-alert';

@Component({
  selector: 'app-meal-picture',
  templateUrl: './meal-picture.component.html',
  styleUrls: ['./meal-picture.component.css']
})
export class MealPictureComponent implements OnInit {

  @ViewChild('fileUpload') upload: any;
  model: NgbDateStruct;
  mealDate: Date = new Date();
  public alerts: Array<IAlert> = [];
  alertCounter: number = 0;

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
        const pictures : Array<MealPicture> = event.body;
        this.alerts.push({id: this.alertCounter, type:'primary', message:'Successfully uploaded', subMessage: pictures.length + ' pictures '});
        setTimeout((index) => this.closeAlertWithId(index) ,1500, this.alertCounter++);
        this.upload.clear();
      }
    }, err => {
      if(err instanceof HttpErrorResponse) {
        this.alerts.push({id: this.alertCounter, type: 'warning', message: 'Error while uploading', subMessage: ""});
        setTimeout((index) => this.closeAlertWithId(index), 2500, this.alertCounter++);
      } else {
        console.log("Error isn't a httpErrorResponse");
        console.log(err);
      }
    });
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  closeAlertWithId(id: number) {
    const alert = this.alerts.find(a => a.id == id);
    const index = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}
