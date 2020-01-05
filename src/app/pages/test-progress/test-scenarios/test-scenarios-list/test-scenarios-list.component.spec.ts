import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScenariosListComponent } from './test-scenarios-list.component';

describe('TestScenariosListComponent', () => {
  let component: TestScenariosListComponent;
  let fixture: ComponentFixture<TestScenariosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestScenariosListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScenariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
