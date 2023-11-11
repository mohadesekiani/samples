import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { IForm, ISearchMultiPath, ISearchRoute } from '../module/interface/search-types.interface';
import { CustomValidators } from './custom.validators';


fdescribe('CustomValidators', () => {
  let formGroup: FormGroup;
  let fb: FormBuilder;
  let form: FormGroup
  let fromFieldCtrl!: AbstractControl;
  let toFieldCtrl!: AbstractControl;
  let minFieldCtrl: AbstractControl
  let maxFieldCtrl: AbstractControl
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
    form = fb.group({
      minField: [null],
      maxField: [null],
    }, {
      validators: [CustomValidators.maxDateFrom('minField', 'maxField')]
    })
    minFieldCtrl = form.get('minField') as AbstractControl;
    maxFieldCtrl = form.get('maxField') as AbstractControl;

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
    fromFieldCtrl.setValue(10); //infant
    toFieldCtrl.setValue(5);
    toFieldCtrl.setValue(10);

    // assert
    expect(fromFieldCtrl.updateValueAndValidity).toHaveBeenCalledWith({
      onlySelf: true,
    });
  });

  it('should be an error when the selected date is smaller than the current date', () => {
    // arrange
    const formGroup = new FormGroup<IForm<ISearchMultiPath>>({
      routes: new FormArray<FormGroup<IForm<ISearchRoute>>>([
        new FormGroup<IForm<ISearchRoute>>({
          origin: new FormControl(null),
          destination: new FormControl(null),
          departureDate: new FormControl(null, [
            CustomValidators.minDateToday(),
          ]),
          returnDate: new FormControl(null),
        }),
      ]),
    });
    const routesFormArray = formGroup.controls.routes as FormArray;
    const routeFormGroup = routesFormArray.at(0) as FormGroup<
      IForm<ISearchRoute>
    >;
    routeFormGroup.patchValue({
      departureDate: new Date('2023-09-30'),
    });
    // assert
    expect(routeFormGroup.controls.departureDate.hasError('dateInvalid')).toBe(
      true
    );
    expect(routeFormGroup.controls.departureDate.errors).toEqual({
      dateInvalid: true,
    });
  });

  fit('should not be smaller than today ', () => {
    // act 
    minFieldCtrl.setValue(new Date())
    maxFieldCtrl.setValue(new Date(10 / 11 / 2023))

    // assert 
    expect(form.invalid).toBeTruthy();
    expect(form.hasError('maxDateFrom')).toBeTruthy();
    expect(maxFieldCtrl.invalid).toBeTruthy();
    expect(maxFieldCtrl.hasError('maxDateFrom')).toBeTruthy();
  });

  it('should not be smaller than the minFromDate ', () => {
    // act 
    minFieldCtrl.setValue(new Date())
    maxFieldCtrl.setValue(new Date(11 / 11 / 2022))

    // assert 
    expect(form.invalid).toBeTruthy();
    expect(maxFieldCtrl.invalid).toBeTruthy();
    expect(form.hasError('maxDateFrom')).toBeTruthy();
    expect(maxFieldCtrl.hasError('maxDateFrom')).toBeTruthy();
  });

  it('should be The selected date , greater than today', () => {
    // arrange 
    const form = new FormBuilder().group(
      {
        minField: [new Date()],
        maxField: [new Date()],
      }, {
      Validators: CustomValidators.maxDateFrom('minField', 'maxField')
    }

    );

    // assert 
    expect(maxFieldCtrl.invalid).toBeFalsy();
    expect(maxFieldCtrl.hasError('maxDateFrom')).toBeFalsy();
  });
});
