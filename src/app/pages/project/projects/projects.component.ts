import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../@core/utils';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  settings = {
    title: 'List Of Project',
    editable: false,
    hideSubHeader: true,
    isAddNew: {
      title: 'Add Project',
      routerLink: "/pages/project/projects/form-view"
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'custom-column',
      custom: [
        { name: 'onView', title: '<i class="ion-eye" title="View project"></i>' },
        { name: 'onEdit', title: '<i class="nb-edit" title="Edit project"></i>' },
        { name: 'onDelete', title: '<i class="nb-trash" title="Delete project"></i>' }
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
  constructor(private ApiService: ApiService, private router: Router) {
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

  //Action Clicks
  onAction(data: any) {
    switch(data.action) {
      case 'onView':
        this.router.navigate(['/pages/project/projects/form-view']);
        break;
      case 'onEdit':
        this.router.navigate(['/pages/project/projects/form-view']);
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
