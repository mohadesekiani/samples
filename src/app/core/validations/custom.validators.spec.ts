import {
  AbstractControl,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { CustomValidators } from './custom.validators';
import { customValidatorsBuilder } from './custom.validators.spec.builder';


fdescribe('SUT: CustomValidators', () => {
  let formGroup: FormGroup;
  let fb: FormBuilder;
  let form: FormGroup;
  let fromFieldCtrl!: AbstractControl;
  let toFieldCtrl!: AbstractControl;
  let fromFieldCtrlDate: AbstractControl
  let toFieldCtrlDate: AbstractControl
  const formBuilderInstance = new customValidatorsBuilder(new FormBuilder());
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
    fromFieldCtrl.setValue(3);
    toFieldCtrl.setValue(1);

    // act
    // toFieldCtrl.setValue(2);

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
    fromFieldCtrl.setValue(10); //infant
    toFieldCtrl.setValue(5);

    // act
    toFieldCtrl.setValue(10);

    // assert
    expect(fromFieldCtrl.invalid).toBeFalse();
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

  xit('should be toField more 1 month ', () => {
    // arrange 
    fromFieldCtrlDate.setValue(new Date(2023, 10, 13))

    // act 
    toFieldCtrlDate.setValue(new Date(2023, 11, 15))

    // assert 
    expect(toFieldCtrlDate.hasError('max')).toBeTruthy()
  });

  it('should be The selected date, greater than today', () => {
    // arrange 
    fromFieldCtrlDate.setValue(new Date())

    // act 
    toFieldCtrlDate.setValue(new Date())

    // assert 
    expect(toFieldCtrlDate.valid).toBeTrue();
  });

  it('should be fromField smaller than today ', () => {
    // act 
    fromFieldCtrlDate.setValue(new Date(2023, 10, 11))

    // assert 
    expect(fromFieldCtrlDate.hasError('today')).toBeTruthy()
  });

  xit('should be have an error when I enter duplicate origins', () => {
    let formA = fb.group({
      routes: fb.array([
        fb.group({ origin: [null] }),
        fb.group({ origin: [null] })
      ])
    }, {
      validators: [CustomValidators.unique('origin')],
    });

    formA.controls.routes.at(0).patchValue({ origin: 'mmmmm' })
    formA.controls.routes.at(1).patchValue({ origin: 'mmmmm' })
    const originCtrl0 = formA.controls.routes.at(0).controls.origin
    const originCtrl1 = formA.controls.routes.at(1).controls.origin
    expect(originCtrl0.hasError('unique')).toBeTruthy()
    expect(originCtrl1.hasError('unique')).toBeTruthy()

  });

  xit('should be have an error when I enter duplicate origins then update value origin', () => {
    let formA = fb.group({
      routes: fb.array([
        fb.group({ origin: [null] }),
        fb.group({ origin: [null] })
      ])
    }, {
      validators: [CustomValidators.unique('origin')],
    });

    formA.controls.routes.at(0).patchValue({ origin: 'mmmmm' })
    formA.controls.routes.at(1).patchValue({ origin: 'mmmmm' })
    formA.controls.routes.at(0).patchValue({ origin: 'v-v' })
    expect(formA.controls.routes.at(0).controls.origin.invalid).toBeFalse();
    expect(formA.controls.routes.at(0).controls.origin?.hasError('unique')).toBeFalsy()
    // expect(formA.controls.routes.at(1).controls.origin.hasError('unique')).toBeTruthy()
  });

  it('should be have an error when I enter duplicate origins then update value origin', () => {
    let fa = fb.array([
      fb.control({ origin: { id: '2' } }),
      fb.control({ origin: { id: '3' } })
    ], {
      validators: [CustomValidators.unique('origin.id')],
    });

    fa.at(1).patchValue({ origin: { id: '2' } })
    expect(fa.hasError('unique')).toBeTruthy()
    expect(fa.at(0)?.hasError('unique')).toBeTruthy()
  });

  it('should be have an error when I enter duplicate origins then update value origin', () => {
    let fg = fb.group({
      routes: [[{ origin: { id: '2' } }, { origin: { id: '3' } }], [
        CustomValidators.unique('origin.id')
      ]]
    });

    fg.controls.routes.patchValue([{ origin: { id: '2' } }, { origin: { id: '2' } }]);

    expect(fg.controls.routes.hasError('unique')).toBeTruthy()
  });

  xit('should be clear unique error when value is change to unique', () => {
    // arrange
    let formA = fb.group({
      routes: fb.array([
        fb.control({ origin: { id: '2' } }),
        fb.control({ origin: { id: '2' } })
      ])
    }, {
      validators: [CustomValidators.unique('origin.id')],
    });

    formA.controls.routes.at(1).patchValue({ origin: { id: '3' } })
    expect(formA.controls.routes.at(0)?.hasError('unique')).toBeFalse()
  });

  it('should not be Its length less than 3', () => {
    // arrange 
    let routesCtrl = formBuilderInstance.atLeastMember_form_validation().routesCtrl;


    // assert 
    expect(routesCtrl.hasError('atLeastMember')).toBeTruthy()
  });

  it('should be Its length less than 3 then push to array', () => {
    // arrange
    let routesCtrl = formBuilderInstance.atLeastMember_form_validation().routesCtrl;

    // act 
    routesCtrl.push(fb.group({ origin: ['mmmm'] }))

    // assert 
    expect(routesCtrl.hasError('atLeastMember')).toBeFalsy()
  })
})
