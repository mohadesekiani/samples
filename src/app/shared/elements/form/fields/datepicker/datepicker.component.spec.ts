import { Injector } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';

describe('SUT: DatepickerComponent', () => {
  let sut: DatepickerComponent;
  let baseInj:Injector
  beforeEach(() => {
    sut = new DatepickerComponent(baseInj);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  // it('should not set value when payload value is less than min', () => {
  //   // arrange
  //   sut.min = new Date('2020/05/05');
  //   // act
  //   sut.dateValueChanged(new Date('2020/05/04'));

  //   // assert
  //   expect(sut.value.toDateString()).not.toBe(
  //     new Date('2020/05/04').toDateString()
  //   );
  //   expect(sut.value.toDateString()).toBe(sut.min.toDateString());
  // });

  // max scenario
  // it('should not set value when payload value is more then max', () => {
  //   // arrange
  //   sut.max = new Date('9/13/2023');

  //   // act
  //   sut.dateValueChanged(new Date('10/14/2023'));

  //   // assert
  //   expect(sut.value.toDateString()).not.toBe(new Date('10/14/2023').toDateString());
  //   expect(sut.value.toDateString()).toBe(sut.max.toDateString());
  // });
  // disable

  // scenario 01
  // before  Mon Oct 02 2023 00:00:00 GMT+0330 (Iran Standard Time)
  // after   Mon Oct 02 2023 23:59:59 GMT+0330 (Iran Standard Time)
  
  
  // scenario 02
  // before  Mon Oct 02 2023 {NOW TIME} GMT+0330 (Iran Standard Time) \\=> new Date()
  // after   Mon Oct 02 2023 00:00:00 GMT+0330 (Iran Standard Time)

  // scenario 03
  // before  Mon Oct 02 2023 {NOW TIME} GMT+0330 (Iran Standard Time) \\=> new Date()
  // after   Mon Oct 02 2023 23:59:59 GMT+0330 (Iran Standard Time)
});
