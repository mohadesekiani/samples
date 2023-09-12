import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPassengersComponent } from './number-passengers.component';

describe('NumberPassengersComponent', () => {
  let component: NumberPassengersComponent;
  let fixture: ComponentFixture<NumberPassengersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberPassengersComponent]
    });
    fixture = TestBed.createComponent(NumberPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
