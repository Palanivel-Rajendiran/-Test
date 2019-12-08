import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScenariosFormComponent } from './test-scenarios-form.component';

describe('TestScenariosFormComponent', () => {
  let component: TestScenariosFormComponent;
  let fixture: ComponentFixture<TestScenariosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestScenariosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScenariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
