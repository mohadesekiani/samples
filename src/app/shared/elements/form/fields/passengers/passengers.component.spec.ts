import { IPassengerTypes, PassengersComponent } from './passengers';

describe('SUT: PassengersComponent', () => {
  let sut: PassengersComponent;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e) => {};
    onTouched: () => {};
  }>({
    onChange: (e) => {},
    onTouched: () => {},
  });
  beforeEach(() => {
    sut = new PassengersComponent();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
  it('should set onChange with proper value when registerOnChange called', () => {
    // act
    sut.onChange(null);

    // assert
    expect(valueAccessor.onChange).toHaveBeenCalled();
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
    sut.increase(item)
    expect(item.value).toBe(1)
  });
  // InfantIncrease(item)
  it('should set item value to 1 if it is 0', () => {
    const item =  { value: 0, name: 'Infant' }
    sut.infantIncrease(item)
    expect(item.value).toBe(1)

  });
  // refersValue()
  it('should update the value property and call onChange, markAsTouched', async() => {
    sut.passenger = [
      { name: 'Adult', value: 2 },
      { name: 'Child', value: 1 },
      { name: 'Infant', value: 0 },
    ];
    spyOn(sut, 'onChange');
    spyOn(sut, 'markAsTouched');
    sut.refersValue();
    expect(sut.onChange).toHaveBeenCalledWith(sut.value);
    expect(sut.markAsTouched).toHaveBeenCalled();

    expect(sut.value).toEqual({ Adult: 2, Child: 1, Infant: 0 } as IPassengerTypes)
  });


});
