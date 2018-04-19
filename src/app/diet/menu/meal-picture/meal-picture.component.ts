import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MealPicture} from '../../../model/mealpicture';
import {UploadFileService} from '../../../services/upload-file.service';
import {SharedService} from '../../service/shared.service';
import {Subscription} from 'rxjs/Subscription';
import {Patient} from '../../../model/patient';
import {isNullOrUndefined} from "util";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

const now = new Date();
@Component({
  selector: 'app-meal-picture',
  templateUrl: './meal-picture.component.html',
  styleUrls: ['./meal-picture.component.css']
})
export class MealPictureComponent implements OnInit, OnDestroy {

  mealPictures: Array<MealPicture> = [];
  selectedMealPictures: Array<MealPicture> = [];
  selectedPatient: Patient;
  selectedDate: NgbDateStruct = {day: now.getUTCDate(), month: now.getUTCMonth() + 1, year: now.getUTCFullYear()};

  private subscriptions = new Subscription();

  constructor(private uploadService: UploadFileService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.subscriptions.add(this.sharedService.patient$.subscribe(
      data => {
        if (!isNullOrUndefined(data)) {
          this.selectedPatient = data;
          this.initModelFiles();
        }
      })
    );
  }

  initModelFiles() {
    this.uploadService.getModelFiles(this.selectedPatient.id).subscribe(data => {
      this.mealPictures = data;
      this.onDateChanged();
    },err => console.log(err))
  }

  loadMealPictures() {
    this.selectedMealPictures.forEach(pic => {
      if(pic.blob == null) {
        this.uploadService.getPicture(pic.id).subscribe(data => {
          const reader = new FileReader();
          const mealPics = this.selectedMealPictures;
          reader.addEventListener("load", function() {
            pic.blob = reader.result;
          });
          reader.readAsDataURL(data);

        }, err => console.log(err));
      }
    });
  }

  onDateChanged() {
    const nativeDate = new Date();
    nativeDate.setUTCFullYear(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day);
    this.selectedMealPictures = this.findMealPicturesOf(nativeDate);
    this.loadMealPictures();
  }

  findMealPicturesOf(date: Date): Array<MealPicture> {
    console.log(date);
    return this.mealPictures.filter(mp =>
      mp.date.getUTCMonth() == date.getUTCMonth()
      && mp.date.getUTCDate() == date.getUTCDate()
      && mp.date.getUTCFullYear() == date.getUTCFullYear());
  }

  containsMealPicture(date: NgbDateStruct) {
    const nativeDate = new Date();
    nativeDate.setUTCFullYear(date.year, date.month - 1, date.day);
   return this.findMealPicturesOf(nativeDate).length > 0;
  }

  getFormattedDate(date: NgbDateStruct): string {
    const nativeDate = new Date();
    nativeDate.setUTCFullYear(date.year, date.month - 1, date.day);
    return moment(nativeDate).format("DD/MM/YYYY");
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
