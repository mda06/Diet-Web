import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadFileService {

  private uploadUrl = "api/pictures/upload";
  private getUrl = "api/pictures/get";

  constructor(private http: HttpClient) {}

  addNewMealPictures(formdata: FormData): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('POST', this.uploadUrl, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(this.getUrl)
  }

}
