import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../@core/utils';

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
      custom: [{ name: 'ourCustomAction', title: '<i class="nb-list"></i>' }],
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
  constructor(private ApiService: ApiService) {
    this.ApiService.testExecutions().subscribe(
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

}
