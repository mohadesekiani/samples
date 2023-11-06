import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangeComponent } from './time-range.component';
import { FormBuilder } from '@angular/forms';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';
import { IRangeTime } from 'src/app/core/module/interface/search-types.interface';

xdescribe('SUT: TimeRangeComponent', () => {
  let sut: TimeRangeComponent;

  beforeEach(() => {
    sut = new TimeRangeComponent();
    sut.ngOnInit();
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be create form with default value', () => {
    // arrange
    const expectedFormValue: IRangeTime = {
      startTime: 300,
      endTime: 1320
    };

    // assert
    expect(sut.form.value).toEqual(expectedFormValue);
  });

  it('should create the form with default values', () => {
    // act
    sut.createForm();

    // assert
    expect(sut.form.value.startTime).toEqual(300);
    expect(sut.form.value.endTime).toEqual(1320);
  });

  it('should be call refersValue on value change', () => {
    // arrange
    spyOn(sut, 'refersValue');

    // act
    sut.form.patchValue({ startTime: 1320 });

    // assert
    expect(sut.refersValue).toHaveBeenCalled();
  });

  it('should patch value to the form', () => {
    // arrange
    const expectedFormValue = {
      startTime: 400,
      endTime: 1200,
    };

    // act
    sut.writeValue(expectedFormValue);

    // assert
    expect(sut.form.value).toEqual(expectedFormValue);
  });

  it('should be format time to hh:mm', () => {
    // arrange
    const expectedFormValue = {
      startTime: 360,
      endTime: 1200,
    };

    // assert
    expect(sut.formatTime(expectedFormValue.startTime)).toBe('06:00');
  });
});
