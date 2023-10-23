import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFlightComponent } from './filter-flight.component';

describe('FilterFlightComponent', () => {
  let component: FilterFlightComponent;
  let fixture: ComponentFixture<FilterFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterFlightComponent]
    });
    fixture = TestBed.createComponent(FilterFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
