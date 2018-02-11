import { Pipe, PipeTransform } from '@angular/core';
import {Customer} from "../../model/customer";

@Pipe({
  name: 'customerfilter',
  pure: false
})
export class CustomerFilterPipe implements PipeTransform {
  transform(items: Customer[], filter: String): Customer[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Customer) => this.applyFilter(item, filter.toString().toLowerCase()));
  }

  applyFilter(cust: Customer, filter: string): boolean {
    if(!filter) return true;
    const split = filter.split(' ');
    for(var word of split) {
      if(!word) continue;
      if(this.contains(cust.firstName, word) || this.contains(cust.lastName, word))
        return true;
    }
    return false;
  }

  contains(source: String, check: string): boolean {
    return source.toLowerCase().indexOf(check) >= 0
  }
}
