import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProjectsComponent } from './project/projects/projects.component';
import { ProjectFormComponent } from './project/projects/project-form/project-form.component';
import { TestPlanComponent } from './project/test-plan/test-plan.component';
import { TestPlanFormComponent } from './project/test-plan/test-plan-form/test-plan-form.component';
import { ProjectCompleteComponent } from './project/project-complete/project-complete.component';

import { TestScenariosComponent } from './test-progress/test-scenarios/test-scenarios.component';
import { TestScenariosListComponent } from './test-progress/test-scenarios/test-scenarios-list/test-scenarios-list.component';
import { TestScenariosFormComponent } from './test-progress/test-scenarios/test-scenarios-form/test-scenarios-form.component';
import { TestCasesComponent } from './test-progress/test-cases/test-cases.component';
import { TestCasesListComponent } from './test-progress/test-cases/test-cases-list/test-cases-list.component';
import { TestCasesFormComponent } from './test-progress/test-cases/test-cases-form/test-cases-form.component';
import { TestExecutionComponent } from './test-progress/test-execution/test-execution.component';
import { TestExecutionListComponent } from './test-progress/test-execution/test-execution-list/test-execution-list.component';
import { TestExecutionFormComponent } from './test-progress/test-execution/test-execution-form/test-execution-form.component';
import { DefectsComponent } from './test-progress/defects/defects.component';
import { TestGenerationComponent } from './test-progress/test-generation/test-generation.component';

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
          children: [
            {
              path: 'list',
              component: ProjectsComponent,
            },
            {
              path: 'form-view',
              component: ProjectFormComponent
            },
            {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
            }
          ]
        },
        {
          path: 'test-plan',
          children: [
            {
              path: 'list',
              component: TestPlanComponent,
            },
            {
              path: 'form-view',
              component: TestPlanFormComponent
            },
            {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
            }
          ]
        },
        {
          path: 'project-complete',
          component: ProjectCompleteComponent
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
          path: 'test-scenarios',
          children: [
            {
              path: 'projects-list',
              component: TestScenariosComponent,
            },
            {
              path: 'list',
              component: TestScenariosListComponent,
            },
            {
              path: 'form-view',
              component: TestScenariosFormComponent
            },
            {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
            }
          ]
        },
        {
          path: 'test-cases',
          children: [
            {
              path: 'projects-list',
              component: TestCasesComponent,
            },
            {
              path: 'list',
              component: TestCasesListComponent,
            },
            {
              path: 'form-view',
              component: TestCasesFormComponent
            },
            {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
            }
          ]
        },
        {
          path: 'test-execution',
          children: [
            {
              path: 'projects-list',
              component: TestExecutionComponent,
            },
            {
              path: 'list',
              component: TestExecutionListComponent,
            },
            {
              path: 'form-view',
              component: TestExecutionFormComponent
            },
            {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
            }
          ]
        },
        {
          path: 'defects',
          component: DefectsComponent
        },
        {
          path: 'test-generation',
          component: TestGenerationComponent
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
