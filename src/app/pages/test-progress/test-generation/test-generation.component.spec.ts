import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGenerationComponent } from './test-generation.component';

describe('TestGenerationComponent', () => {
  let component: TestGenerationComponent;
  let fixture: ComponentFixture<TestGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
