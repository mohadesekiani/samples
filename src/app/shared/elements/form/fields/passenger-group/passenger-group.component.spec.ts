import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerGroupComponent } from './passenger-group.component';

describe('PassengerGroupComponent', () => {
  let component: PassengerGroupComponent;
  let fixture: ComponentFixture<PassengerGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengerGroupComponent]
    });
    fixture = TestBed.createComponent(PassengerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
