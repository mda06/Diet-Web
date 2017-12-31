import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";


@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast(): Observable<any> {
    //ad1ccd51faec383ec56915856e5a940b
    return this._http.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bd5e378503939ddaee76f12ad7a97608");
  }

}
