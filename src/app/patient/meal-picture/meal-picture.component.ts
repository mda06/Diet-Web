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

  mealPictures: Array<MealPicture> = [];

  modelFiles: Array<MealPicture> = [];
  pictures = [];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.initDateModel();
    this.initModelFiles();
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
        this.mealPictures = this.mealPictures.concat(this.pictures);
        this.initMealPictures();
        this.alerts.push({id: this.alertCounter, type:'primary', message:'Successfully uploaded', subMessage: pictures.length + ' pictures '});
        setTimeout((index) => this.closeAlertWithId(index) ,1500, this.alertCounter++);
        this.upload.clear();
      }
    }, err => {
      if(err instanceof HttpErrorResponse) {
        console.log(err);
        this.alerts.push({id: this.alertCounter, type: 'warning', message: 'Error while uploading', subMessage: ""});
        setTimeout((index) => this.closeAlertWithId(index), 2500, this.alertCounter++);
      } else {
        console.log("Error isn't a httpErrorResponse");
        console.log(err);
      }
    });
  }

  initModelFiles() {
    this.uploadService.getModelFiles().subscribe(data => {
      this.mealPictures = data;
      this.initMealPictures();
      },err => console.log(err))
  }

  initMealPictures() {
    this.mealPictures.forEach(pic => {
      if(pic.blob == null) {
        this.uploadService.getPicture(pic.id).subscribe(data => {
          const reader = new FileReader();
          const mealPics = this.mealPictures;
          reader.addEventListener("load", function() {
            pic.blob = reader.result;
          });
          reader.readAsDataURL(data);

        }, err => console.log(err));
      }
    });
  }

  initPictures() {
    this.pictures = [];
    this.modelFiles.forEach(model => {
      const id = model.id;
      this.uploadService.getPicture(id).subscribe(data => {
        console.log(data);
        //this.pictures.push(data);
        const reader = new FileReader();
        const pic = this.pictures;
        reader.addEventListener("load", function() {
          pic.push(reader.result);
          console.log("Added v2!");
        });
        reader.readAsDataURL(data);

      }, err => console.log(err));
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
