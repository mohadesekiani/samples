import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { CustomValidators } from './Custom.validators'; // Import your custom validators

fdescribe('CustomValidators', () => {
  let formGroup: FormGroup;

  let fromFieldCtrl!: AbstractControl;
  let toFieldCtrl!: AbstractControl;

  beforeEach(() => {
    formGroup = new FormBuilder().group(
      {
        fromField: [],
        toField: [],
      },
      {
        validators: [CustomValidators.maxFrom('fromField', 'toField')],
      }
    );

    fromFieldCtrl = formGroup.get('fromField') as AbstractControl;
    toFieldCtrl = formGroup.get('toField') as AbstractControl;
  });

  it('should validate maxFrom correctly', () => {
    // arrange
    fromFieldCtrl.setValue(10);
    toFieldCtrl.setValue(5);
    // assert
    expect(fromFieldCtrl.hasError('max')).toBeTrue();
  });

  it('should validate maxFrom correctly', () => {
    // arrange
    fromFieldCtrl.setValue(10);
    toFieldCtrl.setValue(5);

    // assert
    expect(fromFieldCtrl.hasError('max')).toBeTrue();
  });

  it(`should set max error on fromField when is greater than toField in advance way`, () => {
    // arrange
    toFieldCtrl.setValue(1);
    fromFieldCtrl.setValue(3);

    // act
    toFieldCtrl.setValue(2);

    // assert
    expect(fromFieldCtrl.hasError('max')).toBeTrue();
  });

  it(`should not set max error on fromField when is equal or less than toField`, () => {
    // arrange
    toFieldCtrl.setValue(1);
    fromFieldCtrl.setValue(3);

    // act
    toFieldCtrl.setValue(3);

    // assert
    expect(fromFieldCtrl?.invalid).toBeFalse();
    expect(fromFieldCtrl?.hasError('max')).toBeFalsy();
  });

  it(`should call updateValueAndValidity with onlySelf set to true`, () => {
    // arrange
    spyOn(fromFieldCtrl, 'updateValueAndValidity');
    fromFieldCtrl.setValue(10);//infant
    toFieldCtrl.setValue(5);
    toFieldCtrl.setValue(10);

    // assert
    expect(fromFieldCtrl.updateValueAndValidity).toHaveBeenCalledWith({
      onlySelf: true,
    });
  });

});
