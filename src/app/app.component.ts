/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AppDataService } from './@core/utils/app.data.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private AppService: AppDataService) {
  }

  ngOnInit(): void {
    this.AppService.initAllGobalService();
  }
}
