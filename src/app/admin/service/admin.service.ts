import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {FoodService} from "../../diet/food/service/food.service";
import {Dietetist} from "../../model/dietetist";
import {LoginAccess} from '../../model/loginAccess';
import {Maintenance} from '../../model/maintenance';
import {SignupReturn} from '../../model/signupReturn';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AdminService {

  private dietUrl = "api/dietetist/";
  private loginsUrl = "api/login-access";
  private maintenanceStatusUrl = "api/maintenance/status";
  private maintenanceEnableUrl = "api/maintenance/enable";
  private maintenanceDisableUrl = "api/maintenance/disable";
  private blacklistEnableUrl = "api/login-access/blacklist/enable";
  private blacklistDisableUrl = "api/login-access/blacklist/disable";

  constructor(private http: HttpClient, private _food: FoodService) { }

  get food(): FoodService {
    return this._food;
  }

  getLoginAccess(): Observable<Array<LoginAccess>> {
    return this.http.get<Array<LoginAccess>>(this.loginsUrl, httpOptions);
  }

  getDietetists(): Observable<Array<Dietetist>> {
    return this.http.get<Array<Dietetist>>(this.dietUrl, httpOptions);
  }

  getDietetist(id: number): Observable<Dietetist> {
    return this.http.get<Dietetist>(this.dietUrl + id, httpOptions);
  }

  saveDietetist(diet: Dietetist): Observable<Dietetist> {
    return this.http.post<Dietetist>(this.dietUrl, diet, httpOptions);
  }

  getMaintenanceStatus(): Observable<Maintenance> {
    return this.http.get<Maintenance>(this.maintenanceStatusUrl, httpOptions);
  }

  putInMaintenance(reason: string): Observable<Maintenance> {
    return this.http.post<Maintenance>(this.maintenanceEnableUrl, {'reason': reason}, httpOptions);
  }

  removeMaintenance() : Observable<Maintenance> {
    return this.http.delete<Maintenance>(this.maintenanceDisableUrl, httpOptions);
  }

  blacklistUser(id: string) : Observable<LoginAccess> {
    return this.http.post<LoginAccess>(this.blacklistEnableUrl, {'id': id}, httpOptions);
  }

  unBlacklistUser(id: string) : Observable<LoginAccess> {
    return this.http.post<LoginAccess>(this.blacklistDisableUrl, {'id': id}, httpOptions);
  }

}
