import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProjectsComponent } from './project/projects/projects.component';
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
import { TableViewComponent } from './common/table-view/table-view.component';
// Material Angular Imports
// TODO : Have to move into common Module
import {
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatStepperModule,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE,
} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { AppConstants } from '../@core/utils/constants';
import { ProjectEmployeeRoleMapListComponent } from './project/projects/project-employee-role-map-list/project-employee-role-map-list.component';
import { MapProductAttributesComponent } from './project/projects/map-product-attributes/map-product-attributes.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatStepperModule,
  ],
  declarations: [
    TableViewComponent,
    DashboardComponent,
    PagesComponent,
    ProjectsComponent,
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
    ProjectEmployeeRoleMapListComponent,
    MapProductAttributesComponent,
  ],
  exports: [
    ProjectEmployeeRoleMapListComponent,
    MapProductAttributesComponent,
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: AppConstants.DATE_FORMATS},
  ],
})
export class PagesModule {
}
