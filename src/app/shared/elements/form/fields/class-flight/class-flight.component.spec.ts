import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFlightComponent } from './class-flight.component';
import { FormArray, FormGroup } from '@angular/forms';

fdescribe('SUT: ClassFlightComponent', () => {
  let sut: ClassFlightComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassFlightComponent]
    });

  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should create form with FormArray and subscribe to valueChanges', () => {
    sut.createForm();

    expect(sut.form instanceof FormGroup).toBe(true);
    expect(sut.classesFormArray instanceof FormArray).toBe(true);
    spyOn(sut.classesFormArray.valueChanges, 'subscribe');

    // sut.addCheckboxesToForm();

    expect(sut.classesFormArray.length).toBe(3); 
    expect(sut.classesFormArray.valueChanges.subscribe).toHaveBeenCalled();
  });
  
});
