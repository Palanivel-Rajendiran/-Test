import { Component, OnInit } from '@angular/core';
import { ApiService, LocalStorageService } from '../../../../@core/utils';
import { Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'ngx-test-scenarios-list',
  templateUrl: './test-scenarios-list.component.html',
  styleUrls: ['./test-scenarios-list.component.scss']
})
export class TestScenariosListComponent implements OnInit {

  settings = {
    title: 'List of Test Scenario',
    editable: false,
    hideSubHeader: true,
    isAddNew: {
      title: 'Add Test Scenarios',
      routerLink: "/pages/test-progress/test-scenarios/form-view"
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'action-column',
      custom: [
        { name: 'TestCases', title: '<i class="ion-navicon-round" title="Show Test Case and Data"></i>' },
        { name: 'onView', title: '<i class="ion-eye" title="View Test Scenario"></i>' },
        { name: 'onEdit', title: '<i class="nb-edit" title="Edit Test Scenario"></i>' },
        { name: 'onDelete', title: '<i class="nb-trash" title="Delete Test Scenario"></i>' }
      ],
      position: 'right'
    },
    columns: {
      project_Name: {
        title: 'Project Name',
        type: 'string',
      },
      detRequirement_Name: {
        title: 'Requirement Name',
        type: 'string',
      },
      product_Name: {
        title: 'Product Name',
        type: 'string',
      },
      tscen_Id: {
        title: 'Test Scenario ID',
        type: 'string',
      },
      tScen_Name: {
        title: 'Test Scenario Name',
        type: 'string',
      },
      TScen_Type_Code: {
        title: 'Scenario Type',
        type: 'string',
      },
      tplan_Name: {
        title: 'Test Plan Name',
        type: 'string',
      },
    },
  };
  
  data: any[];

  // Fetch the data from Api Service
  constructor(private ApiService: ApiService, private localStorageService: LocalStorageService, private router: Router) {
    this.ApiService.testScenariosByProject().subscribe(
      resp => this.processApiResponse(resp),
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

  // Process the data if any and assign data to view
  processApiResponse(resp: any) {
    this.data = resp.data;
  }

  //Action Clicks
  onAction(data: any) {
    let storeKeys;
    switch(data.action) {
      case 'TestCases':
        storeKeys = _.pick(data.data, ['project_Code', 'detRequirement_Code']);
        this.localStorageService.setValues(storeKeys);
        this.router.navigate(['/pages/test-progress/test-cases/list']);
        break;
      case 'onView':
        this.router.navigate(['/pages/test-progress/test-scenarios/form-view']);
        break;
      case 'onEdit':
        this.router.navigate(['/pages/test-progress/test-scenarios/form-view']);
        break;
      case 'onDelete':
        confirm('Are you really want to delete ?.')
        break;
      default:
        console.log('No Action Required');
    }
    console.log('TEst Plan ', data);
  }

}
