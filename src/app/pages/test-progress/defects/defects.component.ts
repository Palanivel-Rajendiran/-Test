import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../@core/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.scss'],
})
export class DefectsComponent implements OnInit {

  settings = {
    title: 'List Of Defects',
    editable: false,
    hideSubHeader: true,
    isAddNew: {
      title: 'Add Defect',
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      class: 'custom-column',
      custom: [
        { name: 'onView', title: '<i class="ion-navicon-round" title="View Defect"></i>' },
        { name: 'onEdit', title: '<i class="nb-edit" title="Edit Defect"></i>' },
        { name: 'onDelete', title: '<i class="nb-trash" title="Delete Defect"></i>' },
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
      project_Status: {
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
  constructor(private ApiService: ApiService, private router: Router) {
    this.ApiService.defectsList().subscribe(
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
  
  onAddNew() {
    this.router.navigate(['/pages/test-progress/defects/form-view']);
  }

}
