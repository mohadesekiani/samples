import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiPathComponent } from './multi-path.component';
import { FormBuilder } from '@angular/forms';
import { TravelTypesEnum } from 'src/app/models/travel-types.enum';

describe('SUT: MultiPathComponent', () => {
  let sut: MultiPathComponent;
  let fb: FormBuilder;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e) => {};
    onTouched: () => {};
  }>({
    onChange: (e) => {},
    onTouched: () => {},
  });
  beforeEach(() => {
    fb = new FormBuilder();
    sut = new MultiPathComponent(fb);
    sut.ngOnInit();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should be created form with default value', () => {
    // arrange
    const expectedFormValue = {
      travelType: TravelTypesEnum.OneWay,
      routes: [
        {
          origin: null,
          destination: null,
          departureDate: null,
          returnDate: null,
        },
      ],
    };
    // assert
    expect(sut.form.value).toEqual(expectedFormValue);
  });
});
