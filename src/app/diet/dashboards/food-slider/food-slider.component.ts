import {Component, OnDestroy, OnInit} from '@angular/core';
import {MealPicture} from '../../../model/mealpicture';
import {Subscription} from 'rxjs/Subscription';
import {Patient} from '../../../model/patient';
import {SharedService} from '../../service/shared.service';
import {isNullOrUndefined} from "util";
import {UploadFileService} from '../../../services/upload-file.service';

@Component({
  selector: 'app-food-slider',
  templateUrl: './food-slider.component.html',
  styleUrls: ['./food-slider.component.css']
})
export class FoodSliderComponent implements OnInit, OnDestroy {

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
      this.mealPictures = data
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, data.length > 3 ? 3 : data.length);
      this.loadMealPictures();
    },err => console.log(err))
  }

  loadMealPictures() {
    this.mealPictures
      .sort((a, b) => a.date < b.date ? 1 : 0)
      .forEach(pic => {
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
