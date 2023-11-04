import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFlightComponent } from './company-flight.component';

describe('SUT: CompanyFlightComponent', () => {
  let sut: CompanyFlightComponent;

  beforeEach(() => {
    sut = new CompanyFlightComponent();
    sut.ngOnInit();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should initialize form controls', () => {
    // assert
    expect(sut.form.value).toEqual({
      Mahan: false,
      Caspian: false,
      Chabahar: false,
    });
  });

  it('should update form value when calling writeValue', () => {
    // arrange
    const newValue = {
      Mahan: true,
      Caspian: false,
      Chabahar: true,
    };

    // act
    sut.writeValue(newValue);

    // assert
    expect(sut.form.controls.Mahan.value).toBe(true);
    expect(sut.form.controls.Caspian.value).toBe(false);
    expect(sut.form.controls.Chabahar.value).toBe(true);
  });

  it('should update form value when changing types', () => {
    // arrange
    const controlName: any = sut.types.at(0)?.controlName;
  
    // act
    sut.form.get(controlName)?.setValue(true);
  
    //  assert
    expect(sut.form.controls.Chabahar.value).toBe(true);
  });
});
