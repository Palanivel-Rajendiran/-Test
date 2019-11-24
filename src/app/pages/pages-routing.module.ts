import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { TestExecutionComponent } from './test-progress/test-execution/test-execution.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'project',
      children: [
        {
          path: 'projects',
          component: ProjectsComponent
        },
        {
          path: '',
          redirectTo: 'projects',
          pathMatch: 'full',
        }
      ]
    },
    {
      path: 'test-progress',
      children: [
        {
          path: 'test-execution',
          component: TestExecutionComponent
        },
        {
          path: '',
          redirectTo: 'test-execution',
          pathMatch: 'full',
        }
      ]
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
