import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ControlContainer, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PassengersComponent } from './passengers.component';
import { distinctUntilChanged } from 'rxjs';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';
import { PassengerTypesType } from 'src/app/core/module/interface/passenger-types.interface';

fdescribe('SUT: PassengersComponent', () => {
  let sut: PassengersComponent;
  let fb: FormBuilder;
  let validation;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e: any) => {};
    onTouched: () => {};
  }>({
    onChange: (e: any) => {},
    onTouched: () => {},
  });
  const defaultFormValue = {
    Adult: null,
    Child: null,
    Infant: null,
  };

  beforeEach(() => {
    fb = new FormBuilder();
    validation = new ValidationErrorService();
    sut = new PassengersComponent(fb, validation);
    sut.ngOnInit();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should be created form with default value', () => {
    // assert
    expect(sut.form.value).toEqual(defaultFormValue);
  });

  it('should be not set required error to passenger controller when passenger is empty', () => {
    // act
    sut.form.setValue(defaultFormValue);
    // assert
    expect(sut.form.controls.Adult?.hasError('required')).toBeTrue();
  });

  it('should be not set required error to passengers controller when passengers has proper value ', () => {
    // act
    sut.form?.setValue({ Adult: 1, Child: 1, Infant: 1 });
    // assert
    expect(sut.form?.hasError('required')).toBeFalse();
  });

  it(`should set max error on Infant when is greater than Adult in simple way`, () => {
    // arrange
    sut.form.controls.Infant.setValue(1);

    // action
    sut.form.controls.Infant.setValue(3);

    // assert

    expect(sut.form.controls.Infant?.hasError('max')).toBeTrue();
    // expect(sut.errorMessage).toEqual({ actual: 3, max: 1 });
  });

  it(`should set max error on Infant when is greater than Adult in advance way`, () => {
    // arrange
    sut.form.controls.Adult.setValue(1);
    sut.form.controls.Infant.setValue(3);

    // act
    sut.form.controls.Adult.setValue(2);

    // assert
    expect(sut.form.controls.Infant?.hasError('max')).toBeTrue();

    //
    let errorMessage = sut.form.controls.Infant?.errors.max;
    // expect(errorMessage).toEqual({ actual: 3, max: 2 });
  });

  it(`should not set max error on Infant when is equal or less than Adult`, () => {
    // arrange
    sut.form.controls.Adult.setValue(1);
    sut.form.controls.Infant.setValue(3);

    // act
    sut.form.controls.Adult.setValue(3);
    // assert
    expect(sut.form.controls.Infant.invalid).toBeFalse();
    expect(sut.form.controls.Infant.hasError('max')).toBeFalsy();
  });
});
