import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService, AppDataService } from '../../../../@core/utils';
import _ from 'lodash';

@Component({
  selector: 'ngx-project-employee-role-map-list',
  templateUrl: './project-employee-role-map-list.component.html',
  styleUrls: ['./project-employee-role-map-list.component.scss'],
})
export class ProjectEmployeeRoleMapListComponent implements OnInit {

  @Input('group')
  employeesRoleNResponForm: FormGroup;
  rolesList: any;
  employeesList: any;
  constructor(private ApiService: ApiService,  private AppDataService: AppDataService) { }

  ngOnInit() {
    this.rolesList = this.AppDataService.getDataByServiceParams('Roles');
    this.employeesList = this.AppDataService.getDataByServiceParams('Employees');
  }

  employeesListByRole(roleCode: string) {
    const params = {
      role_Code: roleCode,
    };
    this.ApiService.employeesByRole(params).subscribe(
      (resp: any) => {
        this.employeesList = resp.data;
      },
      error => console.log(error),
    );
  }

}
