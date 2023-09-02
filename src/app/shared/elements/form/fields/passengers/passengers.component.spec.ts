import { PassengersComponent } from './passengers';

fdescribe('SUT: PassengersComponent', () => {
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
  fit('should decrease item.value by 1 when item.value is greater than 0', () => {
    const item = { value: 3 };
    const item2 = { value: 0 };
    sut.decrees(item);
    sut.decrees(item2);
    expect(item.value).toBe(2);
    expect(item2.value).toBe(0);
  });
  // increase(item)
  it('should ', () => {});
  // InfantIncrease(item)
  it('should ', () => {});
  // refersValue()
  it('should ', () => {});
});
