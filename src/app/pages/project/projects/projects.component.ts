import { Component, OnInit } from '@angular/core';
import { ApiService, AppDataService, LocalStorageService } from '../../../@core/utils';
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
  constructor(private ApiService: ApiService, private router: Router, private AppDataService: AppDataService, private localStorageService: LocalStorageService) {
    
  }

  ngOnInit() {
    this.initProjectsSummary();
  }

  initProjectsSummary() {
    this.ApiService.listOfProjects().subscribe(
      (resp: any) => {
        this.data = resp.data;
        this.AppDataService.setDataByServiceParams(resp, 'Projects');
      },
      error => console.log(error)
    );
  }

  initRequestActionWorkFlow(record: any) {
    const params = {
      RequestId: record.Project_Code,
      ProcessId: 'Project',
      IsValid: 'Y',
      IsComplete: 'N'
    };
    this.ApiService.requestActionWorkFlow(params).subscribe(
      (resp: any) => {
        this.initDeleteProject(record);
      },
      error => console.log(error)
    );
  }

  initDeleteProject(record: any) {
    const params = {
      Project_Code: record.Project_Code,
    };
    this.ApiService.deleteProject(params).subscribe(
      (resp: any) => {
        this.initProjectsSummary();
      },
      error => console.log(error)
    );
  }

  //Action Clicks
  onAction(data: any) {
    switch(data.action) {
      case 'onView':
        this.localStorageService.setValues({
          Project_Name: data.data.Project_Name,
          Sdlc_Method_Code: data.data.Sdlc_Method_Code,
          Project_Code: data.data.Project_Code,
          Project_View_By: 'View'
        });
        this.router.navigate(['/pages/project/projects/form-view']);
        break;
      case 'onEdit':
        this.localStorageService.setValues({
          Project_Name: data.data.Project_Name,
          Sdlc_Method_Code: data.data.Sdlc_Method_Code,
          Project_Code: data.data.Project_Code,
          Project_View_By: 'Edit'
        });
        this.router.navigate(['/pages/project/projects/form-view']);
        break;
      case 'onDelete':
        if (confirm('Are you really want to delete ?.')) {
          this.initRequestActionWorkFlow(data.data);
        }
        break;
      default:
        console.log('No Action Required');
    }
    console.log('TEst Plan ', data);
  }

}
