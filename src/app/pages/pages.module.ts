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
  ],
})
export class PagesModule {
}
