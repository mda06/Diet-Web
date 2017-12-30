import {EventEmitter, Injectable} from '@angular/core';
import {Dietetist} from "../../model/dietetist";
import {Patient} from "../../model/patient";

@Injectable()
export class SharedService {

  onSelectedPatient: EventEmitter<Patient> = new EventEmitter<Patient>();
  diet: EventEmitter<Dietetist> = new EventEmitter<Dietetist>();

  constructor() { console.log("Create shared service"); }

}
