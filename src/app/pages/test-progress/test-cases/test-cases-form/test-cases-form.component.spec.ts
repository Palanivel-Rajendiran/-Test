import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCasesFormComponent } from './test-cases-form.component';

describe('TestCasesFormComponent', () => {
  let component: TestCasesFormComponent;
  let fixture: ComponentFixture<TestCasesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCasesFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCasesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
