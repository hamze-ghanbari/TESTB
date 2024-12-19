import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestService } from './test.service';
import { DatePipe, SlicePipe } from '@angular/common';
import { JalaliDatePipe } from './jalali-date.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SlicePipe, DatePipe, JalaliDatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'testProjectB';
  articles: Array<IBlog> | undefined;

  constructor(
    private testService: TestService
  ) { }


  ngOnInit(): void {
    this.testService.getArticles().subscribe(res => {
      console.log('response', res);
      this.articles = res;
    });

    this.testFn(51000000);
  }


  testFn(value: number){
    let val = 0;
    let result1 = 0;
    let result2 = 0;
    let result3 = 0;
    let result4 = 0;
    if(value > 50000000){
      val = value - 50000000; 
      result1 = 50000000 * 5 / 100;
      if(result1 > 1500000){
        result1 = 1500000;
      }
      if(result1 < 500000){
        result1 = 500000;
      }
    }else if(value == 50000000){
      result1 = 1500000;
    }
    console.log('result 1', result1, val);
    
    if(val >= 40000000){
      val = val - 40000000;
      result2 = 40000000 * 3 / 100;
      if(result2 > 1000000){
        result2 = 1000000;
      }
      if(result2 < 500000){
        result2 = 500000;
      }
    }
    console.log('result 2', result2, val);
    
    if(val >= 30000000){
      val = val - 30000000;
      result3 = 30000000 * 1 / 100;
      if(result3 > 200000){
        result3 = 200000;
      }
      if(result3 < 50000){
        result3 = 50000;
      }
    }

    if (val > 0 && val < 30000000){
      result4= 50000;
    }
    // console.log('result', result, val);
    console.log('result 3', result3, val);
    console.log('final', result1 + result2 + result3 + result4);
    // if(val > 40000000){

    // }
  }
}
export interface IBlog {
  abstract: string,
  date: string,
  id: number,
  img: string,
  title: string
}


export const gregorianToJalaliDate = (date: string | Date): string => {
  let result: string = new Date(date).toLocaleDateString('fa-IR');
  if (
      !/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,2}$/.test((convertNumbersToEnglish(result.split('/')) as string[]).join('/')) ||
      result < new Date('0622-03-21').toLocaleDateString('fa-IR')) {
      result = '';
  }
  return result;
} 

export const convertNumbersToEnglish = (value: string | string[]): string | string[] => {
  let result: string[] = [];
  let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
      arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  if (typeof value == 'string') {
      for (let i = 0; i < 10; i++) {
          value = value.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
      }
      return value;
  } else {
      value.forEach((item: string) => {
          for (let i = 0; i < 10; i++) {
              item = item.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
          }
          result.push(item);
      });
      return result;
  }
}