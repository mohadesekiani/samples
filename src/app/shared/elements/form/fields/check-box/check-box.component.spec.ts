import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxComponent } from './check-box.component';

fdescribe('SUT: CheckBoxComponent', () => {
  let sut: CheckBoxComponent;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e: any) => {};
    onTouched: () => {};
  }>({
    onChange: (e: any) => {},
    onTouched: () => {},
  });

  beforeEach(() => {
    sut = new CheckBoxComponent();
    sut.registerOnChange(valueAccessor.onChange);
    sut.registerOnTouched(valueAccessor.onTouched);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
