import { BaseFormControlValueAccessor } from "./base-form-control-value-accessor";

export function BaseFormControlValueAccessorTestFunc(sutFactory: () => BaseFormControlValueAccessor<any>) {
  let sut: BaseFormControlValueAccessor<any>;

  beforeEach(() => {
    sut = sutFactory();
  })

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should be not set required error to passenger controller when passenger is empty', () => {
    // arrange
    sut = sutBuilder.with_some_data_for_form().build();

    // assert
    expect(sut.form.controls.Adult?.hasError('required')).toBeTrue();
  });

}
