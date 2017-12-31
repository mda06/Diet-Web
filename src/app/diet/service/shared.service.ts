import {EventEmitter, Injectable} from '@angular/core';
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SharedService {

  onSelectedPatient: EventEmitter<Patient> = new EventEmitter<Patient>();
  diet: EventEmitter<Dietetist> = new EventEmitter<Dietetist>();

  private dietetist:Subject<Dietetist> = new BehaviorSubject<Dietetist>(null);
  dietetist$ = this.dietetist.asObservable();

  setDietetist(diet:Dietetist) {
    this.dietetist.next(diet);
  }

  constructor() { console.log("Create shared service"); }

}
