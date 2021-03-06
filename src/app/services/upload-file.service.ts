import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MealPicture} from '../model/mealpicture';
import {Data} from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class UploadFileService {

  private uploadUrl = "api/pictures/upload";
  private getModelUrl = "api/pictures/model";
  private getPictureUrl = "api/pictures";
  private deletePictureUrl = "api/pictures";

  constructor(private http: HttpClient) {}

  addNewMealPictures(files: File[], date: Data): Observable<HttpEvent<Array<MealPicture>>> {
    let formData = new FormData();
    let pictureDate = moment(date).format("YYYY-MM-DD");
    formData.append("date", pictureDate);
    for(let file of files) {
      formData.append("pictures", file, file.name);
    }

    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request<Array<MealPicture>>(req);
  }

  getModelFiles(id: number = 0) : Observable<Array<MealPicture>> {
    return this.http.get<Array<MealPicture>>(this.getModelUrl + (id == 0 ? "" : ("?patient=" + id)));
  }

  getPicture(id: number): Observable<Blob> {
    return this.http.get(this.getPictureUrl + "/" + id, {responseType: 'blob'})
  }

  deletePicture(id: number): Observable<MealPicture> {
    return this.http.delete<MealPicture>(this.deletePictureUrl + "/" + id);
  }
}
