import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangeComponent } from './time-range.component';
import { FormBuilder } from '@angular/forms';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';
import { IRangeTime } from 'src/app/core/module/interface/search-types.interface';

describe('SUT: TimeRangeComponent', () => {
  let sut: TimeRangeComponent;
  let fb: FormBuilder;
  let formValidationError;

  beforeEach(() => {
    fb = new FormBuilder();
    formValidationError = new ValidationErrorService();
    sut = new TimeRangeComponent(fb, formValidationError);
    sut.ngOnInit();
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be create form with default value', () => {
    // arrange
    const expectedFormValue: IRangeTime = {
      startTime: '05:30',
      endTime: '22:30',
    };

    // assert
    expect(sut.form.value).toEqual(expectedFormValue);
  });
});
