import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import _ from 'lodash';

@Injectable()
export class AppDataService {
  constructor(private apiService: ApiService) {
  }

  keyValueAPIList: string[] = ['PROJ-STAT-CD', 'SDLC-MTHD-CD', 'PROJ-TYP-CD', 'DEFECTMGMT-TOOL-CD', 'AUTOEXEC-TSTTOOL-CD', 'PROJ-STAT-IND', 'HYBRID'];
  dataByServiceParam: object = {};

  setDataByServiceParams(response: any, mapParam: string) {
    this.dataByServiceParam[mapParam] = response.data || [];
  }

  getDataByServiceParams(mapParam: string) {
    return this.dataByServiceParam[mapParam] || [];
  }

  initApiCall(mapParam: string) {
    const params = {
      KeyValue_Type_Cd: mapParam,
      KeyValue_Lang_Cd: 'E'
    };
    this.apiService.keyValueMap(params).subscribe(
      resp => this.setDataByServiceParams(resp, mapParam),
      error => console.log(error)
    );
  }
 
  initBusinessVerticalParentsList() {
    this.apiService.businessVerticalParentsList().subscribe(
      resp => this.setDataByServiceParams(resp, 'BusinessVerticalParent'),
      error => console.log(error)
    );
  }

  initBusinessVerticalList() {
    this.apiService.businessVerticalList().subscribe(
      resp => this.setDataByServiceParams(resp, 'BusinessVertical'),
      error => console.log(error)
    );
  }

  initEmployessList() {
    this.apiService.employessList().subscribe(
      resp => this.setDataByServiceParams(resp, 'Employees'),
      error => console.log(error)
    );
  }

  initRolesList() {
    this.apiService.rolesList().subscribe(
      resp => this.setDataByServiceParams(resp, 'Roles'),
      error => console.log(error)
    );
  }

  initProjectsList() {
    this.apiService.listOfProjects().subscribe(
      resp => this.setDataByServiceParams(resp, 'Projects'),
      error => console.log(error)
    );
  }

  initAllKeyValueService() {
    _.each(this.keyValueAPIList, (apiParam: string) => this.initApiCall(apiParam));
  }

  initAllGobalService() {
    this.initAllKeyValueService();
    this.initBusinessVerticalParentsList();
    this.initBusinessVerticalList();
    this.initEmployessList();
    this.initRolesList();
    this.initProjectsList();
  }
}
