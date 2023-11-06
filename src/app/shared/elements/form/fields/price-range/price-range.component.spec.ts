
import { FormBuilder } from '@angular/forms';
import { PriceRangeComponent } from './price-range.component';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';

xdescribe('SUT: PriceRangeComponent', () => {
  let sut: BaseFormControlValueAccessor<any>;

  beforeEach(() => {
    sut = new PriceRangeComponent();
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
    const expectedFormValue = {
      minPrice: 100000,
      maxPrice: 1000000,
    };

    // act
    sut.writeValue(expectedFormValue);

    // assert
    expect(sut.form.value).toEqual(expectedFormValue);
  });
});
