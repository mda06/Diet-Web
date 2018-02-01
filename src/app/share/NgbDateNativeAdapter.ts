import {Component, Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {isNullOrUndefined} from "util";

//https://ng-bootstrap.github.io/#/components/datepicker/examples
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

  fromModel(date: Date): NgbDateStruct {
    return (date && date.getUTCFullYear) ?
      {year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate()} : null;
  }

  toModel(date: NgbDateStruct): Date {
    if(isNullOrUndefined(date)) return null;
    var nativeDate = new Date();
    nativeDate.setUTCFullYear(date.year, date.month - 1, date.day);
    return nativeDate;
  }
}
