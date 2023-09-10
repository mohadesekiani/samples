import { ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { IPassengerTypes } from 'src/app/models/passenger-types.interface';
import { PassengersComponent } from './passengers.component';

fdescribe('SUT: PassengersComponent', () => {
  let sut: PassengersComponent;
  let fb: FormBuilder;

  let passengers;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e) => {};
    onTouched: () => {};
  }>({
    onChange: (e) => {},
    onTouched: () => {},
  });
  beforeEach(() => {
    fb = new FormBuilder();
    sut = new PassengersComponent(fb);
    sut.ngOnInit();
    passengers = sut.passengers.get('passengers');
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  xit('should set onChange with proper value when registerOnChange called', () => {
    // act
    sut.onChange(null);

    // assert
    expect(valueAccessor.onChange).toHaveBeenCalled();
  });

  it('should be created form with default value', () => {
    // arrange
    const expectedFormValue = {
      adult: null,
      child: null,
      infant: null,
    };
    // assert
    expect(sut.passengers.value).toEqual(expectedFormValue);
  });

  xit('should be not set required error to passenger controller when passenger is empty', () => {
    // act
    passengers?.setValue(null);
    // assert
    expect(passengers?.hasError('required')).toBeTrue();
  });

  xit('should be not set required error to passengers controller when passengers has proper value ', () => {
    // act
    passengers?.setValue({ adult: 1, child: 1, infant: 1 });
    // assert
    expect(passengers?.hasError('required')).toBeFalse();
  });

  xit('should be items passenger 0 not valid', () => {
    // act
    passengers?.setValue({ adult: 0, child: 0, infant: 0 });
    sut.passengers.markAsTouched();
    // assert
    expect(sut.passengers.hasError('checkedNumberZero')).toBeTrue();
  });
  xit(`should be the number of infants is greater than the number of adults,
  the passenger count error must be adjusted in the flight form`, () => {
    // act
    passengers?.setValue({ adult: 1, child: 0, infant: 2 });
    // assert
    expect(sut.passengers.hasError('max')).toBeTrue();
    expect(sut.passengers.getError('max')).toEqual({ actual: 2, max: 1 });
  });

  // decrees(item)
  it('should not decrease item.value when item.value is 0', () => {
    const item2 = { value: 0 };
    sut.decrees(item2);
    expect(item2.value).toBe(0);
  });

  it('should decrease item.value by 1 when item.value is greater than 0', () => {
    const item = { value: 3 };
    sut.decrees(item);
    expect(item.value).toBe(2);
  });
  // increase(item)
  it('should increase item value by 1 ', () => {
    const item = { value: 0 };
    //sut.increase(item);
    expect(item.value).toBe(1);
  });

  xit('should update the value property and call onChange, markAsTouched', async () => {
    sut.passenger = [
      { name: 'Adult', value: 2 },
      { name: 'Child', value: 1 },
      { name: 'Infant', value: 0 },
    ];
    spyOn(sut, 'onChange');
    spyOn(sut, 'markAsTouched');
    sut.refersValue();
    // expect(sut.onChange).toHaveBeenCalledWith(sut.value);
    expect(sut.markAsTouched).toHaveBeenCalled();

    // expect(sut.value).toEqual({
    //   adult: 2,
    //   child: 1,
    //   infant: 0,
    // } as IPassengerTypes);
  });
  fit('should be when click incresed button updated value passengers form', () => {
    // this.refersValue();
    let item = { value: 5, name: 'adult' };
    let ctrl = sut.passengers.get(item.name);
    ctrl?.setValue(item.value);
    sut.incresed(item.name);

    expect(sut.passengers?.get(item.name)?.value).toBe(ctrl?.value + 1);
  });
});
