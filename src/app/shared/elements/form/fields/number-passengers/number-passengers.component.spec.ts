import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';
import { NumberPassengersComponent } from './number-passengers.component';

describe('SUT: NumberPassengersComponent', () => {
  let sut: NumberPassengersComponent;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e) => {};
    onTouched: () => {};
  }>({
    onChange: (e) => {},
    onTouched: () => {},
  });
  beforeEach(() => {
    sut = new NumberPassengersComponent();
    sut.registerOnChange(valueAccessor.onChange);
    sut.registerOnTouched(valueAccessor.onTouched);
  });
  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });
  it('should set onChange with proper value when registerOnChange called', () => {
    // act
    sut.onChange(1);

    // assert
    expect(valueAccessor.onChange).toHaveBeenCalled();
  });

  it('should be value is value + 1 when increase button clicked  ', () => {
    // arrange
    const initialValue = sut.value;
    // act
    sut.increased();
    // assert
    expect(sut.value).toBe(initialValue + 1);
  });

  it('should be value is value - 1 when decrease button clicked  ', () => {
    // arrange
    sut.value = 10;
    let initialValue = sut.value - 1;
    // act
    sut.decrees();
    // assert
    expect(sut.value).toBe(initialValue);
  });

  it('should be when value is 0 decrease button clicked  ', () => {
    // arrange
    sut.value = 0;
    let initialValue = 0;
    // act
    sut.decrees();
    // assert
    expect(sut.value).toBe(initialValue);
  });

  it('should be when enter the value for input ', () => {
    // arrange
    let enterValue = 10;
    const event = { target: { value: enterValue } };
    // act
    sut.changeHandler(event);
    // assert
    expect(sut.value).toBe(enterValue);
  });

});