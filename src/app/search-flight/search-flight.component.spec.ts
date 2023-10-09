import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFlightComponent } from './search-flight.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassTypesEnum } from '../core/module/enum/class-types.enum';
import { TravelTypesEnum } from '../core/module/enum/travel-types.enum';

describe('SUT:SearchFlightComponent', () => {
  let sut: SearchFlightComponent;
  type FlightFormGroup = FormGroup;
  let fb: FormBuilder;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    fb = new FormBuilder();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
    sut = new SearchFlightComponent(fb, router);
    sut.today = new Date();
    sut.ngOnInit();
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
    expect(sut.classTypes).toEqual([
      { title: 'First Class', value: ClassTypesEnum.FirstClass },
      { title: 'Business', value: ClassTypesEnum.Business },
      { title: 'Economy', value: ClassTypesEnum.Economy },
      { title: 'Premium Class', value: ClassTypesEnum.PremiumClass },
    ]);
  });

  it('should be create form with default value', () => {
    // arrange
    const expectedFormValue = {
      routes: null,
      passengers: null,
      travelType: 'OneWay',
      classType: null,
    };
    expect(sut.flightForm.value).toEqual(expectedFormValue);
  });

  // onSubmit
  it('should check form is valid then go to result page ', () => {
    // arrange
    sut.flightForm.setValue({
      routes: {
        travelType: TravelTypesEnum.OneWay,
        routes: [
          {
            origin: 'San Antonio',
            destination: 'San Antonio',
            departureDate: '2023-09-04T11:53:30.877Z',
            returnDate: '2023-09-04T11:53:30.877Z',
          },
        ],
      },
      passengers: { Adult: 1, Child: 1, Infant: 1 },
      travelType: 'OneWay',
      classType: 'FirstClass',
    });
    // act
    sut.submit();
    // assert
    expect(router.navigate).toHaveBeenCalledWith(['/results']);
  });

  it('should check form is valid then go to result alert', () => {
    // arrange
    spyOn(window, 'alert');
    sut.flightForm.patchValue({
      passengers: null,
    });
    // act
    sut.submit();
    // assert
    expect(window.alert).toHaveBeenCalledWith('فرم ثبت نشد');
  });

});