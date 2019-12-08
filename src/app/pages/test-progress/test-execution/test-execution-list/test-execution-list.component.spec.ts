import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecutionListComponent } from './test-execution-list.component';

describe('TestExecutionListComponent', () => {
  let component: TestExecutionListComponent;
  let fixture: ComponentFixture<TestExecutionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestExecutionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExecutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
