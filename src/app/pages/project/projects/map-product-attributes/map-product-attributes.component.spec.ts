import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapProductAttributesComponent } from './map-product-attributes.component';

describe('MapProductAttributesComponent', () => {
  let component: MapProductAttributesComponent;
  let fixture: ComponentFixture<MapProductAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapProductAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapProductAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
