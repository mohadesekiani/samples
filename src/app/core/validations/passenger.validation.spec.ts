import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { CustomValidators } from './passenger.validation'; // Import your custom validators

fdescribe('CustomValidators', () => {
  let formGroup: FormGroup;
  let fromField!: string;
  let toField!: string;
  
  beforeEach(() => {
    formGroup = new FormGroup({
      fromField: new FormControl(),
      toField: new FormControl(),
    });
    fromField = 'fromField';
    toField = 'toField';
    CustomValidators.maxFrom(fromField, toField)(formGroup);
  });

  it('should create an instance', () => {
    expect(CustomValidators).toBeTruthy();
  });

  it('should validate maxFrom correctly', () => {
    // arrange
    formGroup.controls[fromField].setValue(10);
    formGroup.controls[toField].setValue(5);

    // assert
    expect(formGroup.controls[fromField].hasError('max')).toBeTrue();
  });

  it('should validate maxFrom correctly', () => {
    // arrange
    formGroup.controls[fromField].setValue(10);
    formGroup.controls[toField].setValue(5);

    // assert
    expect(formGroup.controls[fromField].hasError('max')).toBeTrue();
  });

  it(`should set max error on fromField when is greater than toField in advance way`, () => {
    // arrange
    formGroup.controls[toField].setValue(1);
    formGroup.controls[fromField].setValue(3);

    // act
    formGroup.controls[toField].setValue(2);

    // assert
    expect(formGroup.controls[fromField].hasError('max')).toBeTrue();
  });

  fit(`should not set max error on fromField when is equal or less than toField`, () => {
    // arrange
    formGroup.controls[toField].setValue(1);
    formGroup.controls[fromField].setValue(3); 

    // act
    formGroup.controls[toField].setValue(3);

    // assert
    expect(formGroup.controls[fromField]?.invalid).toBeFalse();
    expect(formGroup.controls[fromField]?.hasError('max')).toBeFalsy();
  });
});
