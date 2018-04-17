import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MealPicture} from '../../../model/mealpicture';
import {UploadFileService} from '../../../services/upload-file.service';
import {SharedService} from '../../service/shared.service';
import {Subscription} from 'rxjs/Subscription';
import {Patient} from '../../../model/patient';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-meal-picture',
  templateUrl: './meal-picture.component.html',
  styleUrls: ['./meal-picture.component.css']
})
export class MealPictureComponent implements OnInit, OnDestroy {

  mealPictures: Array<MealPicture> = [];
  selectedPatient: Patient;

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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
