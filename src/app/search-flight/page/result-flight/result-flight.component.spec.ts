import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFlightComponent } from './result-flight.component';

describe('ResultFlightComponent', () => {
  let sut: ResultFlightComponent;
  let fixture: ComponentFixture<ResultFlightComponent>;

  beforeEach(() => {

    fixture = TestBed.createComponent(ResultFlightComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
