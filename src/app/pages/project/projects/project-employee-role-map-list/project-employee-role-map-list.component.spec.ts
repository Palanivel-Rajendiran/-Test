import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEmployeeRoleMapListComponent } from './project-employee-role-map-list.component';

describe('ProjectEmployeeRoleMapListComponent', () => {
  let component: ProjectEmployeeRoleMapListComponent;
  let fixture: ComponentFixture<ProjectEmployeeRoleMapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEmployeeRoleMapListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEmployeeRoleMapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
