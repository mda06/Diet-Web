import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {MenuReport} from "../../model/menureport";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReportService {

  private reportsOfMenu = "api/report/menu/";

  constructor(private http: HttpClient) {
  }

  getReportOfMenu(id: number, lang: string): Observable<MenuReport> {
    let params = new HttpParams()
      .set('lang', lang)
      .set('id', id.toString());
    return this.http.get<MenuReport>(this.reportsOfMenu, {
      headers: httpOptions.headers,
      params: params
    });
  }
}
