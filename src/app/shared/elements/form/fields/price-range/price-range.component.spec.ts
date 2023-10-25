import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRangeComponent } from './price-range.component';
import { FormBuilder } from '@angular/forms';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';
import { IRangePrice } from 'src/app/core/module/interface/search-types.interface';

fdescribe('PriceRangeComponent', () => {
  let sut: PriceRangeComponent;
  let fb: FormBuilder;
  let formValidationError;
  beforeEach(() => {
    fb = new FormBuilder();
    formValidationError = new ValidationErrorService();
    sut = new PriceRangeComponent(fb, formValidationError);
    sut.ngOnInit();
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be call refersValue on value change', () => {
    // arrange
    spyOn(sut, 'refersValue');

    // act
    sut.form.setValue({ minPrice: 120000, maxPrice: 10000000 });

    // assert
    expect(sut.refersValue).toHaveBeenCalled();
    expect(sut.form.value).toEqual({ minPrice: 120000, maxPrice: 10000000 });
  });

  it('should patch value to the form', () => {
    // arrange
    const expectedFormValue: IRangePrice = {
      minPrice: 100000,
      maxPrice: 1000000,
    };

    // act
    sut.writeValue(expectedFormValue);

    // assert
    expect(sut.form.value).toEqual(expectedFormValue);
  });
});
