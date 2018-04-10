import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MealPicture} from '../model/mealpicture';

@Injectable()
export class UploadFileService {

  private uploadUrl = "api/pictures/upload";
  private getUrl = "api/pictures/get";

  constructor(private http: HttpClient) {}

  addNewMealPictures(formdata: FormData): Observable<HttpEvent<Array<MealPicture>>> {
    const req = new HttpRequest('POST', this.uploadUrl, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request<Array<MealPicture>>(req);
  }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(this.getUrl)
  }

}
