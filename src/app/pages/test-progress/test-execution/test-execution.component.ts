import { Component, OnInit } from '@angular/core';
import { ApiService, LocalStorageService } from '../../../@core/utils';
import { Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'ngx-test-execution',
  templateUrl: './test-execution.component.html',
  styleUrls: ['./test-execution.component.scss']
})
export class TestExecutionComponent implements OnInit {

  settings = {
    title: 'List of Projects mapped to the Requirements',
    editable: false,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'action-column',
      custom: [{ name: 'onList', title: '<i class="ion-navicon-round" title="List"></i>' }],
      position: 'right'
    },
    columns: {
      project_code: {
        title: 'project code',
        type: 'string',
      },
      Project_Name: {
        title: 'Project Name',
        type: 'string',
      },
      Project_Status: {
        title: 'Project Status',
        type: 'string',
      },
      BusRequirement_code: {
        title: 'Business Requirement code',
        type: 'string',
      },
      DetRequirement_Code: {
        title: 'Detail Requirement Code',
        type: 'string',
      },
      DetRequirement_Name: {
        title: 'Detail Requirement Name',
        type: 'string',
      },
    },
  };
  
  data: any[];

  // Fetch the data from Api Service
  constructor(private ApiService: ApiService, private localStorageService: LocalStorageService, private router: Router) {
    this.ApiService.projectsByTestProgress().subscribe(
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
      case 'onList':
        storeKeys = _.pick(data.data, ['project_Code', 'DetRequirement_Code']);
        this.localStorageService.setValues(storeKeys);
        this.router.navigate(['/pages/test-progress/test-execution/list']);
        break;
        break;
      default:
        console.log('No Action Required');
    }
    console.log('TEst Plan ', data);
  }
}
