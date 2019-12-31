import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LocalStorageService } from './localStorage.service';
import _ from 'lodash';
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
    const params = {
      IsActive: 'A'
    };
    return this.service.get('/Fantestico/project', params);
  }

  // Get the Test Execution Results
  testExecutions() {
    const params = {
      BusRequirement_Version: '1.0',
      project_Code: this.localStorageService.getValue('project_code')
    };
    return this.service.get('/Fantestico/dashboard/traceablityBusReqAndDetReq', params);
  }

  // Get the Project Complete
  projectComplete() {
    const params = {
      project_Status: 200
    }
    return this.service.get('/Fantestico/dashboard/LandingPagegetsummery', params);
  }

  // Get the Test Plans
  testPlans() {
    return this.service.get('/Fantestico/testplan', {});
  }

  // Project List By Test Progress
  projectsByTestProgress() {
    const params = {
      BusRequirement_Version: '1.0',
      project_Code: this.localStorageService.getValue('project_code')
    };
    return this.service.get('/Fantestico/dashboard/traceablityBusReqAndDetReq', params);
  }

  // List of Test scenarios
  testScenariosByProject() {
    const params = {
      project_Code: this.localStorageService.getValue('project_code'),
      detRequirement_Code: this.localStorageService.getValue('detRequirement_code')
    };
    return this.service.get('/Fantestico/testscen', params);
  }

  // List of Test Cases
  testCasesByProject() {
    const params = {
      project_code: this.localStorageService.getValue('project_code'),
      requirement_code: this.localStorageService.getValue('detRequirement_code')
    };
    return this.service.get('/Fantestico/testcasewithdata', params);
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
    const params = {
      IsActive: 'A'
    };
    return this.service.get('/Fantestico/defectlistall', params);
  }

  // Get Project Status Code Mapping
  keyValueMap(params: object) {
    return this.service.get('/Fantestico/keyvalue', params);
  }

  // Get all the Business Vertical Parents List
  businessVerticalParentsList() {
    return this.service.get('/Fantestico/businessverticalparent', {});
  }

  // Get all the Business Vertical List
  businessVerticalList() {
    const params = {
      IsActive: 'A'
    };
    return this.service.get('/Fantestico/businessVertical', params);
  }

  // Get all the Employess List
  employessList() {
    return this.service.get('/Fantestico/manageemp/getemployeeservice', {})
  }

  // Get all the Roles & Responsibility List
  rolesList() {
    return this.service.get('/Fantestico/role', {})
  }

  //Save or Update the Project
  populateProject(params: Object) {
    return this.service.get('/Fantestico/project', params);
  }
  //Save or Update the Project
  saveOrUpdateProject(payload: Object) {
    return this.service.post('/Fantestico/project', payload);
  }

  //Save or Update the Project
  saveOrUpdateEmpRoleMapByProject(pList: any[]) {
    pList = _.map(pList, (l:any) => {
      return this.service.post('/Fantestico/projectroleempmap', l);
    })
    return this.service.forkJoinPost(pList);
  }

  // Populate Assign Requirement and Products To This Project
  initialAssignReqNProducts(params: object) {
    return this.service.get('/Fantestico/getreqtprodnotassignedtoproject', params);
  }

  // Populate Assign Requirement and Products To This Project
  populateAssignReqNProductsToEdit(params: object) {
    return this.service.get('/Fantestico/getreqtprodnotassignedtoprojectedit', params);
  }

  // Populate Roles & Resposibilities List By Project
  rolesNResponsibilitiesListByProject(params: object) {
    return this.service.get('/Fantestico/projectroleempmap', params)
  }

  //Get Employees list by role assigned
  employeesByRole(params: Object) {
    return this.service.get('/Fantestico/manageemp/getemployeefromrole', params);
  }

  // Get Project Employees List
  initialEmployeesByProject(params: Object) {
    return this.service.get('/Fantestico/projectuserempdetails', params);
  }

  // De-associate employee role map from project
  deAssociateEmployeeRoleFromProject(params: Object) {
    return this.service.delete('/Fantestico/projectroleempmap', params)
  }

  // Delete the project
  requestActionWorkFlow(params: object) {
    return this.service.get('/Fantestico/requestActionWorkFlow', params);
  }
  deleteProject(params: object) {
    return this.service.delete('/Fantestico/project', params);
  }

  // Same Data API Call
  mockData(count: Number) {
    return this.service.get('./assets/data/' + count + '.json', {});
  }
}
