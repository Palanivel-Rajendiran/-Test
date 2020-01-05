import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompleteComponent } from './project-complete.component';

describe('ProjectCompleteComponent', () => {
  let component: ProjectCompleteComponent;
  let fixture: ComponentFixture<ProjectCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCompleteComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
