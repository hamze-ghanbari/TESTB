import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBlog } from './app.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles():Observable<Array<IBlog>>{
    return this.http.get<any>('https://cdn.boghrat.com/api/codeChallenge/angular');
  }
}
