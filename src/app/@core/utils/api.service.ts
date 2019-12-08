import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LocalStorageService } from './localStorage.service';
@Injectable()
// Api Service is config of any view
// API Methods, It'll eliminate the duplicate 
// by view's
export class ApiService {

  // imported HttpService for single entry all the views
  constructor(private service: HttpService, private localStorageService: LocalStorageService) {
  }

  // Get the list of project
  listOfProjects() {
    return this.service.get('/Fantestico/project?IsActive=A', {});
  }

  // Get the Test Execution Results
  testExecutions() {
    const params = {
      project_Code: this.localStorageService.getValue('project_code')
    };
    return this.service.get('/Fantestico/dashboard/traceablityBusReqAndDetReq?BusRequirement_Version=1.0', params);
  }

  // Get the Project Complete
  projectComplete() {
    return this.service.get('/Fantestico/dashboard/LandingPagegetsummery?project_Status=200', {});
  }

  // Get the Test Plans
  testPlans() {
    return this.service.get('/Fantestico/testplan', {});
  }

  // Project List By Test Progress
  projectsByTestProgress() {
    const params = {
      project_Code: this.localStorageService.getValue('project_code')
    };
    return this.service.get('/Fantestico/dashboard/traceablityBusReqAndDetReq?BusRequirement_Version=1.0', params);
  }

  // List of Test scenarios
  testScenariosByProject() {
    // const params = {
    //   project_Code: this.localStorageService.getValue('project_code'),
    //   detRequirement_Code: this.localStorageService.getValue('detRequirement_code')
    // };
    return this.service.get('/Fantestico/testscen', {});
  }

  // List of Test Cases
  testCasesByProject() {
    // const params = {
    //   project_code: this.localStorageService.getValue('project_code'),
    //   requirement_code: this.localStorageService.getValue('detRequirement_code')
    // };
    return this.service.get('/Fantestico/testcasewithdata', {});
  }

  testExecutionByProject() {
    const params = {
      IsActive: 'A',
      project_Code: this.localStorageService.getValue('project_code'),
      DetRequirement_Code: this.localStorageService.getValue('detRequirement_code')
    };
    return this.service.get('/Fantestico/testexecution', params);
  }

  // Defects List
  defectsList() {
    return this.service.get('/Fantestico/defectlistall?IsActive=A');
  }

}
