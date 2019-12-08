import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import _ from 'lodash';

@Injectable()
//Http Service is use by to communicate with servers(backend)
export class HttpService {

  constructor(private http: HttpClient) {
  }
  // Gobal Method to Fetch the Data from Server
  get(url: string, param: object): Observable<any[]> {
    console.log('pppppp => ', param);
    let httpQueryParam = new HttpParams();
    _.each(param, (value: any, key: any) => {
      httpQueryParam = httpQueryParam.append(key, value);
    });
    return this.http.get<any[]>(url, { params: httpQueryParam });
  }

  // Gobal Method to Fetch/Post the Data from/to Server
  post(url: string, data: object): Observable<any[]> {
    return this.http.post<any[]>(url, data);
  }

  // Gobal Method to Update the Data to Server
  put(url: string, data: object): Observable<any[]> {
    return this.http.put<any[]>(url, data);
  }

}
