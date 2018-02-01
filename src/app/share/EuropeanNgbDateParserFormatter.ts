import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";

@Injectable()
export class EuropeanNgbDateParserFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
    if(isNullOrUndefined(value)) return {year: 0, month: 0, day: 0};
    const split = value.split("/");
    if(split.length != 3) return {year: 0, month: 0, day: 0};
    const day = +split[0];
    const month = +split[1];
    const year = +split[2];
    return {year: year, month: month, day: day};
  }

  format(date: NgbDateStruct): string {
    if(isNullOrUndefined(date)) return "";
    return date.day + "/" + date.month + "/" + date.year;
  }

}
