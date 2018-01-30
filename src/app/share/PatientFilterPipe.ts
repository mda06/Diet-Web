import { Pipe, PipeTransform } from '@angular/core';

import { Patient } from '../model/patient';

@Pipe({
  name: 'patientfilter',
  pure: false
})
export class PatientFilterPipe implements PipeTransform {
  transform(items: Patient[], filter: String): Patient[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Patient) => this.applyFilter(item, filter.toString().toLowerCase()));
  }

  applyFilter(patient: Patient, filter: string): boolean {
    if(!filter) return true;
    const split = filter.split(' ');
    for(var word of split) {
      if(!word) continue;
      if(this.contains(patient.firstName, word) || this.contains(patient.lastName, word))
        return true;
    }
    return false;
  }

  contains(source: String, check: string): boolean {
    return source.toLowerCase().indexOf(check) >= 0
  }
}
