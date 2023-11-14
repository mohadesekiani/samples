import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxComponent } from './check-box.component';

describe('SUT: CheckBoxComponent', () => {
  let sut: CheckBoxComponent;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e: any) => {};
    onTouched: () => {};
  }>({
    onChange: (e: any) => { },
    onTouched: () => { },
  });

  beforeEach(() => {
    sut = new CheckBoxComponent();
    sut.registerOnChange(valueAccessor.onChange);
    sut.registerOnTouched(valueAccessor.onTouched);
  });

  it('should create', () => {
    // assert 
    expect(sut).toBeTruthy();
  });

  it('should be properly', () => {
    // assert 
    expect(sut.value).toBe(false)
  });

  fit('should be change checkBox when calling onCheckboxChange', () => {
    // arrange
    sut.value = true

    // act 
    sut.onCheckboxChange();
    
    // assert 
    expect(sut.value).toBe(false)
    expect(sut.onChange).toHaveBeenCalledWith(sut.value)
  });

});
