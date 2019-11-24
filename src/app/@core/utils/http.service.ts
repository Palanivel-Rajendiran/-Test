import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
//Http Service is use by to communicate with servers(backend)
export class HttpService {

  constructor(private http: HttpClient) {
  }
  // Gobal Method to Fetch the Data from Server
  get(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
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
