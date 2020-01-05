import { Component, OnInit } from '@angular/core';
import { ApiService, AppDataService } from '../../@core/utils';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  mockby: Number = 1000;
  options: any[] = [1000, 5000, 10000, 15000, 20000, 25000];
  settings = {
    title: 'Mock Data',
    editable: false,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'custom-column',
      custom: [
        { name: 'onView', title: '<i class="ion-eye" title="View project"></i>' },
        { name: 'onEdit', title: '<i class="nb-edit" title="Edit project"></i>' },
        { name: 'onDelete', title: '<i class="nb-trash" title="Delete project"></i>' },
      ],
      position: 'right',
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
      },
    },
  };

  data: any[];
  constructor(private ApiService: ApiService, private AppDataService: AppDataService) {

  }

  ngOnInit() {
    this.initProjectsSummary();
  }

  initProjectsSummary() {
    this.ApiService.mockData(this.mockby).subscribe(
      (resp: any) => {
        this.data = resp.data;
      },
      error => console.log(error),
    );
  }

  ngOnDestroy() {}
}
