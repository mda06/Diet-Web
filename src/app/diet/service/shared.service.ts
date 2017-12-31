import {Injectable} from '@angular/core';
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SharedService {

  private dietetist:Subject<Dietetist> = new BehaviorSubject<Dietetist>(null);
  dietetist$ = this.dietetist.asObservable();
  private patient:Subject<Patient> = new BehaviorSubject<Patient>(null);
  patient$ = this.patient.asObservable();

  setDietetist(diet:Dietetist) {
    this.dietetist.next(diet);
  }

  setPatient(patient:Patient) {
    this.patient.next(patient);
  }

  constructor() { }

}
