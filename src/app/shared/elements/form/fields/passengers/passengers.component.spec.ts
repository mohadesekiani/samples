import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { IPassengerTypes } from 'src/app/models/passenger-types.interface';
import { PassengersComponent } from './passengers.component';
import { distinctUntilChanged } from 'rxjs';

describe('SUT: PassengersComponent', () => {
  let sut: PassengersComponent;
  let fb: FormBuilder;

  let passengers;
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
    passengers = sut.form.get('passengers');
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

  it(`should be the number of infants is greater than the number of adults,
  the passenger count error must be adjusted in the flight form`, () => {
    // act
    debugger
    sut.form?.get('Adult')?.setValue(1);
    sut.form?.get('Infant')?.setValue(3);
    sut.form?.get('Adult')?.setValue(2);

    // assert
    expect(sut.form.get('Infant')?.hasError('max')).toBeTrue();
    sut.errorMessage = sut.form.get('Infant')?.getError('max');
    expect(sut.errorMessage).toEqual({ actual: 3, max: 2 });
  });

  // decrees(item)

  // it('should not decrease this.passengers.get(item.name) when this.passengers.get(item.name) is not 0', () => {
  //   // arrange
  //   let item = { value: 0, name: 'Adult' };
  //   // act
  //   sut.form?.get(item.name)?.setValue(10);
  //   sut.decrees(item);
  //   let updatedValue = sut.form?.get(item.name)?.value;
  //   // assert
  //   expect(updatedValue).toBe(9);
  // });

  // it('should not decrease this.passengers.get(item.name) when this.passengers.get(item.name) is 0', () => {
  //   // arrange
  //   let item = { value: 0, name: 'Adult' };
  //   // act
  //   sut.form?.get(item.name)?.setValue(0);
  //   sut.decrees(item);
  //   let updatedValue = sut.form?.get(item.name)?.value;
  //   // assert
  //   expect(updatedValue).toBe(0);
  // });
  // increase(item)
  // it('should increase item value by 1 ', () => {
  //   // arrange
  //   let item = { value: 0, name: 'Adult' };
  //   // act
  //   sut.increased(item);
  //   // assert
  //   expect(sut.form?.get(item.name)?.value).toBe(1);
  // });

  it('should update the value property and call onChange, markAsTouched', async () => {
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
