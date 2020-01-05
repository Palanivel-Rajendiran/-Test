/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AppDataService, LocalStorageService } from './@core/utils';
import { AppConstants } from  './@core/utils/constants';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private AppService: AppDataService, private router: Router, private LocalStorageService: LocalStorageService) {
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        if (AppConstants.clearProjectInfoFromLocalStorageViews.indexOf(event.url) !== -1) {
          this.LocalStorageService.removeItems(['Sdlc_Method_Code', 'Project_View_By', 'DetRequirement_Code', 'DetRequirement_Name', 'DetRequirement_Version', 'Prod_Name', 'Prod_Code', 'Func_Code', ]);
          if (!this.LocalStorageService.getValue('is_ignore_project')) {
            this.LocalStorageService.removeItems(['project_code', 'project_name']);
          }
          this.LocalStorageService.removeItems(['is_ignore_project']);
        }
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
      }

      if (event instanceof NavigationError) {
          // Present error to user
          console.log(event.error);
      }
  });
  }

  ngOnInit(): void {
    this.AppService.initAllGobalService();
  }
}
