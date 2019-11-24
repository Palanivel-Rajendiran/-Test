import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../@core/utils';


@Component({
  selector: 'ngx-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

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
        { name: 'onView', title: '<i class="nb-list"></i>' },
        { name: 'onEdit', title: '<i class="nb-edit"></i>' },
        { name: 'onDelete', title: '<i class="nb-trash"></i>' }
      ],
      position: 'right'
    },
    columns: {
      Project_Code: {
        title: 'Project Code',
        type: 'number',
      },
      Project_Name: {
        title: 'Project Name',
        type: 'string',
      },
      Project_Status: {
        title: 'Project Status',
        type: 'string',
      },
      Project_Description: {
        title: 'Project Description',
        type: 'string',
      }
    }
  };

  data: any[];

  // Fetch the Data From API Service
  constructor(private ApiService: ApiService) {
    this.ApiService.listOfProjects().subscribe(
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

}
