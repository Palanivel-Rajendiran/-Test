import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ProjectsComponent } from './project/projects/projects.component';
import { TableViewComponent } from './common/table-view/table-view.component';
import { TestProgressComponent } from './test-progress/test-progress.component';
import { TestExecutionComponent } from './test-progress/test-execution/test-execution.component';
import { TestPlanComponent } from './project/test-plan/test-plan.component';
import { ProjectCompleteComponent } from './project/project-complete/project-complete.component';
import { TestScenariosComponent } from './test-progress/test-scenarios/test-scenarios.component';
import { TestCasesComponent } from './test-progress/test-cases/test-cases.component';
import { DefectsComponent } from './test-progress/defects/defects.component';
import { TestGenerationComponent } from './test-progress/test-generation/test-generation.component';
import { ProjectFormComponent } from './project/projects/project-form/project-form.component';
import { TestPlanFormComponent } from './project/test-plan/test-plan-form/test-plan-form.component';
import { TestScenariosListComponent } from './test-progress/test-scenarios/test-scenarios-list/test-scenarios-list.component';
import { TestScenariosFormComponent } from './test-progress/test-scenarios/test-scenarios-form/test-scenarios-form.component';
import { TestCasesListComponent } from './test-progress/test-cases/test-cases-list/test-cases-list.component';
import { TestCasesFormComponent } from './test-progress/test-cases/test-cases-form/test-cases-form.component';
import { TestExecutionListComponent } from './test-progress/test-execution/test-execution-list/test-execution-list.component';
import { TestExecutionFormComponent } from './test-progress/test-execution/test-execution-form/test-execution-form.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    DashboardModule
  ],
  declarations: [
    PagesComponent,
    ProjectsComponent,
    TableViewComponent,
    TestProgressComponent,
    TestExecutionComponent,
    TestPlanComponent,
    ProjectCompleteComponent,
    TestScenariosComponent,
    TestCasesComponent,
    DefectsComponent,
    TestGenerationComponent,
    ProjectFormComponent,
    TestPlanFormComponent,
    TestScenariosListComponent,
    TestScenariosFormComponent,
    TestCasesListComponent,
    TestCasesFormComponent,
    TestExecutionListComponent,
    TestExecutionFormComponent,
  ],
})
export class PagesModule {
}
