import { Component, OnInit } from '@angular/core';
import { ApiService, AppDataService } from '../../../@core/utils';
import _ from 'lodash';

@Component({
  selector: 'ngx-project-complete',
  templateUrl: './project-complete.component.html',
  styleUrls: ['./project-complete.component.scss'],
})
export class ProjectCompleteComponent implements OnInit {

  settings = {
    title: 'List Of Projects',
    editable: false,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'custom-column',
      custom: [
        { name: 'onApprove', title: '<i class="ion-android-checkmark-circle" title="Complete Project"></i>' },
      ],
      position: 'right',
    },
    columns: {
      project_Code: {
        title: 'Project Code',
        type: 'number',
      },
      project_Name: {
        title: 'Project Name',
        type: 'string',
      },
      Project_Status_Desc: {
        title: 'Project Status',
        type: 'string',
      },
      BV_Name: {
        title: 'Business Vertical Name',
        type: 'string',
      },
    },
  };

  data: any[];

  // Fetch the Data From API Service
  constructor(private ApiService: ApiService, private AppDataService: AppDataService) {
    this.ApiService.projectComplete().subscribe(
      resp => this.processApiResponse(resp),
      error => console.log(error),
    );
  }

  ngOnInit() {
  }

  // Process the response if any & assign to var to view
  processApiResponse(resp: any) {
    const projStatusDescMap = this.AppDataService.getDataByServiceParams('PROJ-STAT-CD_MAP');
    this.data = _.map(resp.data, (proj: any) => {
      proj['Project_Status_Desc'] = projStatusDescMap[proj['project_Status']];
      return proj;
    });
  }

  // Action Clicks
  onAction(data: any) {
    switch (data.action) {
      case 'onApprove':
        alert('Complete Project: Functionality added soon...!');
        break;
      default:
        console.log('No Action Required');
    }
    console.log('TEst Plan ', data);
  }

}
