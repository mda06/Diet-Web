import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MealPicture} from '../model/mealpicture';
import {Data} from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class UploadFileService {

  private uploadUrl = "api/pictures/upload";
  private getUrl = "api/pictures/get";

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

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(this.getUrl)
  }

}
