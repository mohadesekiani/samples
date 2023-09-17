import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ControlContainer, FormBuilder, FormControl } from '@angular/forms';
import { IPassengerTypes } from 'src/app/models/passenger-types.interface';
import { PassengersComponent } from './passengers.component';
import { distinctUntilChanged } from 'rxjs';
import { IForm, ISearchPassenger } from 'src/app/models/search-types.interface';

describe('SUT: PassengersComponent', () => {
  let sut: PassengersComponent;
  let fb: FormBuilder;

  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e) => {};
    onTouched: () => {};
  }>({
    onChange: (e) => { },
    onTouched: () => { },
  });
  beforeEach(() => {
    fb = new FormBuilder();
    sut = new PassengersComponent(fb);
    sut.ngOnInit();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should be created form with default value', () => {
    // arrange
    const expectedFormValue = {
      Adult: null,
      Child: null,
      Infant: null,
    };
    // assert
    expect(sut.form.value).toEqual(expectedFormValue);
  });

  it('should be not set required error to passenger controller when passenger is empty', () => {
    // act
    sut.form.setValue({
      Adult: null,
      Child: null,
      Infant: null,
    });
    // assert
    expect(sut.form.get('Adult')?.hasError('required')).toBeTrue();
  });

  it('should be not set required error to passengers controller when passengers has proper value ', () => {
    // act
    sut.form?.setValue({ Adult: 1, Child: 1, Infant: 1 });
    // assert
    expect(sut.form?.hasError('required')).toBeFalse();
  });

  // xit(`should be the number of infants is greater than the number of adults,
  // the passenger count error must be adjusted in the flight form`, () => {
  //   // act

  //   sut.form?.get('Adult')?.setValue(1);
  //   sut.form?.get('Infant')?.setValue(3);

  //   // assert
  //   expect(sut.childrenCountValidator()(sut.form)).toEqual({
  //     max: { actual: 3, max: 1 },
  //   });
  //   expect(sut.form?.hasError('max')).toBeTrue();
  //   expect(sut.form?.getError('max')).toEqual({ actual: 3, max: 1 });
  // });

  it(`should set max error on Infant when is greater than Adult in simple way`, () => {
    // arrange
    sut.form?.get('Adult')?.setValue(1);

    // action
    sut.form?.get('Infant')?.setValue(3);

    // assert

    expect(sut.form.get('Infant')?.hasError('max')).toBeTrue();
    // expect(sut.errorMessage).toEqual({ actual: 3, max: 1 });
  });

  it(`should set max error on Infant when is greater than Adult in advance way`, () => {
    // arrange
    sut.form?.get('Adult')?.setValue(1);
    sut.form?.get('Infant')?.setValue(3);

    // act
    sut.form?.get('Adult')?.setValue(2);

    // assert
    expect(sut.form.get('Infant')?.hasError('max')).toBeTrue();

    // 
    let errorMessage = sut.form.get('Infant')?.getError('max');
    console.log(errorMessage);
    // expect(errorMessage).toEqual({ actual: 3, max: 2 });
  });

  it(`should not set max error on Infant when is equal or less than Adult`, () => {
    // arrange
    sut.form?.get('Adult')?.setValue(1);
    sut.form?.get('Infant')?.setValue(3);

    // act
    sut.form?.get('Adult')?.setValue(3);
    // assert
    expect(sut.form.get('Infant')?.invalid).toBeFalse();
    expect(sut.form.get('Infant')?.hasError('max')).toBeFalsy();
  });

  xit('should update the value property and call onChange, markAsTouched', async () => {
    // act
    sut.passenger = [
      { name: 'Adult', value: 2 },
      { name: 'Child', value: 1 },
      { name: 'Infant', value: 0 },
    ];
    spyOn(sut, 'onChange');
    spyOn(sut, 'markAsTouched');
    sut.refersValue();

    // assert
    expect(sut.onChange).toHaveBeenCalledWith(sut.form.value);
    expect(sut.markAsTouched).toHaveBeenCalled();
  });
});
