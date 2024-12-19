import { Pipe, PipeTransform } from '@angular/core';
import { convertNumbersToEnglish } from './app.component';

@Pipe({
  name: 'jalaliDate',
  standalone: true
})
export class JalaliDatePipe implements PipeTransform {

  transform(value: string | Date): string | null {
    let result: string = new Date(value).toLocaleDateString('fa-IR');
  if (
      !/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,2}$/.test((convertNumbersToEnglish(result.split('/')) as string[]).join('/')) ||
      result < new Date('0622-03-21').toLocaleDateString('fa-IR')) {
      result = '';
  }
  return result;
}

}