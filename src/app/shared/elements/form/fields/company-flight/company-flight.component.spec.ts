import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFlightComponent } from './company-flight.component';

describe('CompanyFlightComponent', () => {
  let component: CompanyFlightComponent;
  let fixture: ComponentFixture<CompanyFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyFlightComponent]
    });
    fixture = TestBed.createComponent(CompanyFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
