import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecutionFormComponent } from './test-execution-form.component';

describe('TestExecutionFormComponent', () => {
  let component: TestExecutionFormComponent;
  let fixture: ComponentFixture<TestExecutionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExecutionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecutionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
