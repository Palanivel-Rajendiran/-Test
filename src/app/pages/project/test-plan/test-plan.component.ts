import { Component, OnInit } from '@angular/core';
import { ApiService, LocalStorageService } from '../../../@core/utils';
import { Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'ngx-test-plan',
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss'],
})
export class TestPlanComponent implements OnInit {

  settings = {
    title: 'List Of Test Plans',
    editable: false,
    hideSubHeader: true,
    isAddNew: {
      title: 'Add Test Plan',
      routerLink: '/pages/project/test-plan/form-view',
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'custom-column',
      custom: [
        { name: 'TestScenarios', title: '<i class="ion-navicon-round" title="Show Scenario"></i>' },
        { name: 'TestCases', title: '<i class="ion-ios-list-outline" title="Show Test Case and Data"></i>' },
        { name: 'onView', title: '<i class="ion-eye" title="View Test Plan"></i>' },
        { name: 'onEdit', title: '<i class="nb-edit" title="Edit Test Plan"></i>' },
        { name: 'onDelete', title: '<i class="nb-trash" title="Delete Test Plan"></i>' },
      ],
      position: 'right',
    },
    columns: {
      project_Name: {
        title: 'Project Name',
        type: 'string',
      },
      tplan_Code: {
        title: 'Test Plan Code',
        type: 'string',
      },
      tplan_Name: {
        title: 'Test Plan Name',
        type: 'string',
      },
      tplan_Desc: {
        title: 'Test Plan Description',
        type: 'string',
      },
      status_Code: {
        title: 'Test Plan Status',
        type: 'string',
      },
    },
  };

  data: any[];

  // Fetch the Data From API Service
  constructor(private ApiService: ApiService, private localStorageService: LocalStorageService, private router: Router) {
    this.ApiService.testPlans().subscribe(
      resp => this.processApiResponse(resp),
      error => console.log(error),
    );
  }

  ngOnInit() {
  }

  // Process the response if any & assign to var to view
  processApiResponse(resp: any) {
    this.data = resp.data;
  }

  // Action Clicks
  onAction(data: any) {
    let storeKeys;
    switch (data.action) {
      case 'TestScenarios':
        storeKeys = _.pick(data.data, ['project_Code']);
        storeKeys.is_ignore_project = true;
        this.localStorageService.setValues(storeKeys);
        this.router.navigate(['/pages/test-progress/test-scenarios/projects-list']);
        break;
      case 'TestCases':
        storeKeys = _.pick(data.data, ['project_Code']);
        storeKeys.is_ignore_project = true;
        this.localStorageService.setValues(storeKeys);
        this.router.navigate(['/pages/test-progress/test-cases/projects-list']);
        break;
      case 'onView':
        this.router.navigate(['/pages/project/test-plan/form-view']);
        break;
      case 'onEdit':
        this.router.navigate(['/pages/project/test-plan/form-view']);
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
