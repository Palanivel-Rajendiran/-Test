import { Component, OnInit } from '@angular/core';
import { ApiService, LocalStorageService } from '../../../../@core/utils';
import { Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'ngx-test-cases-list',
  templateUrl: './test-cases-list.component.html',
  styleUrls: ['./test-cases-list.component.scss'],
})
export class TestCasesListComponent implements OnInit {

  settings = {
    title: 'List of Test Cases',
    editable: false,
    hideSubHeader: true,
    isAddNew: {
      title: 'Add Test Case',
      routerLink: '/pages/test-progress/test-cases/form-view',
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'action-column',
      custom: [
        { name: 'TestExec', title: '<i class="ion-navicon-round" title="Show Test Execution"></i>' },
        { name: 'onAdd', title: '<i class="ion-plus" title="Add Test Case"></i>' },
        { name: 'onView', title: '<i class="ion-eye" title="View Test Case"></i>' },
        { name: 'onEdit', title: '<i class="nb-edit" title="Edit Test Case"></i>' },
        { name: 'onDelete', title: '<i class="nb-trash" title="Delete Test Case"></i>' },
      ],
      position: 'right',
    },
    columns: {
      detRequirement_Name: {
        title: 'Requirement Name',
        type: 'string',
      },
      project_Name: {
        title: 'Project Name',
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
      tscen_Id: {
        title: 'Scenario Id',
        type: 'string',
      },
      tcase_Expected_Result: {
        title: 'Expected Results',
        type: 'string',
      },
      tcaseStatus_desc: {
        title: 'Test Case Status',
        type: 'string',
      },
    },
  };

  data: any[];

  // Fetch the data from Api Service
  constructor(private ApiService: ApiService, private localStorageService: LocalStorageService, private router: Router) {
    this.ApiService.testCasesByProject().subscribe(
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
      case 'TestExec':
        storeKeys = _.pick(data.data, ['project_Code', 'DetRequirement_Code']);
        this.localStorageService.setValues(storeKeys);
        this.router.navigate(['/pages/test-progress/test-execution/list']);
        break;
      case 'onAdd':
        this.router.navigate(['/pages/test-progress/test-cases/form-view']);
        break;
      case 'onView':
        this.router.navigate(['/pages/test-progress/test-cases/form-view']);
        break;
      case 'onEdit':
        this.router.navigate(['/pages/test-progress/test-cases/form-view']);
        break;
      case 'onDelete':
        confirm('Are you really want to delete ?.');
        break;
      default:
        console.log('No Action Required');
    }
    console.log('TEst Plan ', data);
  }

  onAddNew() {
    this.router.navigate(['/pages/test-progress/test-cases/form-view']);
  }

}
