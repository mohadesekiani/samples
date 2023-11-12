import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { IForm, ISearchMultiPath, ISearchRoute } from '../module/interface/search-types.interface';
import { CustomValidators } from './custom.validators';


fdescribe('SUT: CustomValidators', () => {
  let formGroup: FormGroup;
  let fb: FormBuilder;
  let form: FormGroup
  let fromFieldCtrl!: AbstractControl;
  let toFieldCtrl!: AbstractControl;
  let fromFieldCtrlDate: AbstractControl
  let toFieldCtrlDate: AbstractControl
  beforeEach(() => {
    fb = new FormBuilder()
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

    form = fb.group({
      fromField: [null],
      toField: [null],
    }, {
      validators: [CustomValidators.maxDateTo('fromField', 'toField'),
      CustomValidators.minDateTo('fromField', 'toField'),
      CustomValidators.minDateToday('fromField')
      ]
    })
    fromFieldCtrlDate = form.get('fromField') as AbstractControl;
    toFieldCtrlDate = form.get('toField') as AbstractControl;
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
    fromFieldCtrl.setValue(10); //infant
    toFieldCtrl.setValue(5);
    toFieldCtrl.setValue(10);

    // assert
    expect(fromFieldCtrl.updateValueAndValidity).toHaveBeenCalledWith({
      onlySelf: true,
    });
  });

  it('should not be smaller than today ', () => {
    // arrange 
    fromFieldCtrlDate.setValue(new Date())

    // act 
    toFieldCtrlDate.setValue(new Date(2023, 10, 10))

    // assert 
    expect(toFieldCtrlDate.invalid).toBeTruthy();
    expect(toFieldCtrlDate.hasError('min')).toBeTruthy();
  });

  it('should not be smaller than the minFromDate ', () => {
    // arrange 
    fromFieldCtrlDate.setValue(new Date())

    // act 
    toFieldCtrlDate.setValue(new Date(2023, 10, 10))

    // assert 
    expect(toFieldCtrlDate.invalid).toBeTruthy();
    expect(toFieldCtrlDate.hasError('min')).toBeTruthy();
  });

  it('should be toField more 1 month ', () => {
    // arrange 
    fromFieldCtrlDate.setValue(new Date(2023, 10, 13))

    // act 
    toFieldCtrlDate.setValue(new Date(2023, 11, 15))

    // assert 
    expect(toFieldCtrlDate.hasError('max')).toBeTruthy()
  });

  it('should be The selected date , greater than today', () => {
    // arrange 
    fromFieldCtrlDate.setValue(new Date())

    // act 
    toFieldCtrlDate.setValue(new Date())

    // assert 
    expect(toFieldCtrlDate.valid).toBeTrue();
  });

  it('should be fromField smaller than today ', () => {
    // act 
    fromFieldCtrlDate.setValue(new Date(2023,10,11))

    // assert 
    expect(fromFieldCtrlDate.hasError('today')).toBeTruthy()
  });
  
});
