import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../@core/utils';

@Component({
  selector: 'ngx-project-complete',
  templateUrl: './project-complete.component.html',
  styleUrls: ['./project-complete.component.scss']
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
      position: 'right'
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
      project_Status: {
        title: 'Project Status',
        type: 'string',
      },
      BV_Name: {
        title: 'Business Vertical Name',
        type: 'string',
      }
    }
  };

  data: any[];

  // Fetch the Data From API Service
  constructor(private ApiService: ApiService) {
    this.ApiService.projectComplete().subscribe(
      resp => this.processApiResponse(resp),
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

  // Process the response if any & assign to var to view
  processApiResponse(resp: any) {
    this.data = resp.data;
  }

  //Action Clicks
  onAction(data: any) {
    switch(data.action) {
      case 'onApprove':
        alert('Complete Project: Functionality added soon...!');
        break;
      default:
        console.log('No Action Required');
    }
    console.log('TEst Plan ', data);
  }

}
