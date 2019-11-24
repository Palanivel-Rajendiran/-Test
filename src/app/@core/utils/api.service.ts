import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
@Injectable()
// Api Service is config of any view
// API Methods, It'll eliminate the duplicate 
// by view's
export class ApiService {

  // imported HttpService for single entry all the views
  constructor(private service: HttpService) {
  }

  // Get the list of project
  listOfProjects() {
    return this.service.get('/Fantestico/project?IsActive=A');
  }

  // Get the Test Execution Results
  testExecutions() {
    return this.service.get('/Fantestico/dashboard/traceablityBusReqAndDetReq?BusRequirement_Version=1.0')
  }

}
