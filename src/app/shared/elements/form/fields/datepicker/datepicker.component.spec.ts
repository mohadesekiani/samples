import { DatepickerComponent } from './datepicker.component';

fdescribe('SUT: DatepickerComponent', () => {
  let sut: DatepickerComponent;

  beforeEach(() => {
    sut = new DatepickerComponent();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  fit('should not set value when payload value is less than min', () => {
    // arrange
    sut.min = new Date('2020/05/05');
    // act
    sut.dateValueChanged(new Date('2020/05/04'));

    // assert
    expect(sut.value.toDateString()).not.toBe(
      new Date('2020/05/04').toDateString()
    );
    expect(sut.value.toDateString()).toBe(sut.min.toDateString());
  });

  // max scenario
  fit('should not set value when payload value is more then max', () => {
    // arrange
    sut.max = new Date('9/13/2023');

    // act
    sut.dateValueChanged(new Date('10/14/2023'));

    // assert
    expect(sut.value.toDateString()).not.toBe(new Date('10/14/2023').toDateString());
    expect(sut.value.toDateString()).toBe(sut.max.toDateString());
  });
  // disable
});
