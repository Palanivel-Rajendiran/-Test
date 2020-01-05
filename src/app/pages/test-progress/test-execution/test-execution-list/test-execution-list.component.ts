import { Component, OnInit } from '@angular/core';
import { ApiService, LocalStorageService } from '../../../../@core/utils';
import { Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'ngx-test-execution-list',
  templateUrl: './test-execution-list.component.html',
  styleUrls: ['./test-execution-list.component.scss'],
})
export class TestExecutionListComponent implements OnInit {

  settings = {
    title: 'List of Test Execution',
    editable: false,
    hideSubHeader: true,
    isAddNew: {
      title: 'Add Test Execution',
      routerLink: '/pages/test-progress/test-execution/form-view',
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'action-column',
      custom: [
        { name: 'TestCases', title: '<i class="ion-navicon-round" title="Show Test Execution"></i>' },
        { name: 'onView', title: '<i class="ion-plus" title="Add Test Execution"></i>' },
        { name: 'onView', title: '<i class="ion-eye" title="View Test Execution"></i>' },
        { name: 'onEdit', title: '<i class="nb-edit" title="Edit Test Execution"></i>' },
        { name: 'onDelete', title: '<i class="nb-trash" title="Delete Test Execution"></i>' },
      ],
      position: 'right',
    },
    columns: {
      project_Name: {
        title: 'Project Name',
        type: 'string',
      },
      project_Code: {
        title: 'Project Code',
        type: 'string',
      },
      tcase_Id: {
        title: 'Test Case Id',
        type: 'string',
      },
      tcase_Name: {
        title: 'Test Case Name',
        type: 'string',
      },
      tcase_exec_Id: {
        title: 'Test Case Execution ID',
        type: 'string',
      },
      tcase_Status_Code: {
        title: 'Status',
        type: 'string',
      },
      tcase_Result: {
        title: 'Results',
        type: 'string',
      },
    },
  };

  data: any[];

  // Fetch the data from Api Service
  constructor(private ApiService: ApiService, private localStorageService: LocalStorageService,  private router: Router) {
    this.ApiService.testExecutionByProject().subscribe(
      resp => this.processApiResponse(resp),
      error => console.log(error),
    );
  }

  ngOnInit() {
  }

  // Process the data if any and assign data to view
  processApiResponse(resp: any) {
    this.data = resp.data;
  }

  // Action Clicks
  onAction(data: any) {
    let storeKeys;
    switch (data.action) {
      case 'TestCases':
        storeKeys = _.pick(data.data, ['project_Code', 'detRequirement_Code']);
        this.localStorageService.setValues(storeKeys);
        this.router.navigate(['/pages/test-progress/test-execution/list']);
        break;
      case 'onView':
        this.router.navigate(['/pages/test-progress/test-execution/form-view']);
        break;
      case 'onEdit':
        this.router.navigate(['/pages/test-progress/test-execution/form-view']);
        break;
      case 'onDelete':
        confirm('Are you really want to delete ?.');
        break;
      default:
        console.log('No Action Required');
    }
    console.log('TEst Plan ', data);
  }

}
