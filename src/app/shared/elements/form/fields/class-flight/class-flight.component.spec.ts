import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFlightComponent } from './class-flight.component';
import { FormArray, FormGroup } from '@angular/forms';

fdescribe('SUT: ClassFlightComponent', () => {
  let sut: ClassFlightComponent;

  beforeEach(() => {
    sut = new ClassFlightComponent();
    sut.ngOnInit();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should set value to true if checkbox is checked', () => {
    // arrange
    const fakeEvent: any = {
      target: {
        checked: true,
        value: 'someValue',
      } as HTMLInputElement,
    };

    // act
    sut.changeCheckBox(fakeEvent, 0);

    // assert
    expect(sut.classesFormArray.at(0).value).toBe('someValue');
  });

  it('should set value to false if checkbox is unchecked', () => {
    // arrange
    const fakeEvent: any = {
      target: {
        checked: false,
        value: 'someValue',
      } as HTMLInputElement,
    };

    // act
    sut.changeCheckBox(fakeEvent, 0);

    // assert
    expect(sut.classesFormArray.at(0).value).toBe(false);
  });

  it('should create form with FormArray and subscribe to valueChanges', () => {
    // arrange
    sut.createForm();

    // act
    sut.form.controls.classes.patchValue(['classy', false, false, false]);

    // assert
    expect(sut.form instanceof FormGroup).toBe(true);
    expect(sut.classesFormArray instanceof FormArray).toBe(true);
    expect(sut.classesFormArray.length).toBe(4);
  });
});
