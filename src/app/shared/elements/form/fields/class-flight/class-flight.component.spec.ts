import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFlightComponent } from './class-flight.component';

describe('ClassFlightComponent', () => {
  let component: ClassFlightComponent;
  let fixture: ComponentFixture<ClassFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassFlightComponent]
    });
    fixture = TestBed.createComponent(ClassFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
