import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'decimalFormat'
})
export class DecimalFormatPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: any): string {
    if (!isNaN(value)) {
      return this.decimalPipe.transform(value, '1.2-2');
    }
    return value;
  }
}
