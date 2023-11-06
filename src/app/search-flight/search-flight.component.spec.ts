import { Router } from '@angular/router';
import { ClassTypesEnum } from '../core/module/enum/class-types.enum';
import { TravelTypesEnum } from '../core/module/enum/travel-types.enum';
import { TestInitialize } from '../core/utils/test';
import { SearchFlightComponent } from './search-flight.component';
import { FormBuilder } from '@angular/forms';
import { ValidationErrorService } from '../shared/services/validation-error.service';

fdescribe('SUT: SearchFlightComponent', () => {
  let sut: SearchFlightComponent;
  let fb: FormBuilder;
  let router: jasmine.SpyObj<Router>;
  let formValidationError;
  beforeEach(() => {
    fb = new FormBuilder();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
    formValidationError = new ValidationErrorService();

    sut = new SearchFlightComponent(router);
    sut.ngOnInit();
  });

  it('should be create properly', () => {
    expect(sut).toBeTruthy();
    expect(sut.resultUrl).toBe('/result-flight');
  });

  it('should be set classFlightTypes with proper value when constructor called', () => {
    expect(sut.classTypes).toEqual([
      { title: 'First Class', value: ClassTypesEnum.FirstClass },
      { title: 'Business', value: ClassTypesEnum.Business },
      { title: 'Economy', value: ClassTypesEnum.Economy },
      { title: 'Premium Class', value: ClassTypesEnum.PremiumClass },
    ]);
  });

  it('should be set travelFlightTypes with proper value when constructor called', () => {
    expect(sut.travelTypes).toEqual([
      { title: 'One Way', value: TravelTypesEnum.OneWay },
      { title: 'Round Trip', value: TravelTypesEnum.RoundTrip },
      { title: 'Multi Path', value: TravelTypesEnum.MultiPath },
    ]);
  });

  it('should be create form with default value', () => {
    // assert
    expect(sut.form.value).toEqual({
      routes: null,
      passengers: null,
      travelType: 'OneWay',
      classType: null,
    });
  });

  it('should be when submit routing to `/result-flight` with condition valid form', () => {
    // arrange
    sut.form.setValue({
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
    expect(router.navigate).toHaveBeenCalledWith(['/result-flight']);
  });

  it('should be check form is invalid', () => {
    // arrange
    sut.form.patchValue({
      passengers: null,
    });
    sut.form.markAsPristine();

    // act
    sut.submit();

    // assert
    expect(sut.form.dirty).toBeTrue();
    expect(sut.form.touched).toBeTrue();
  });

  it('should validate "fomControl" field as required', () => {
    // arrange
    const passengerCtrl = sut.form.controls.passengers;
    const routesCtrl = sut.form.controls.routes;
    const classTypeCtrl = sut.form.controls.classType;

    // act
    passengerCtrl.setValue(null);
    routesCtrl.setValue(null);
    classTypeCtrl.setValue(null);

    // assert
    expect(passengerCtrl.valid).toBeFalsy();
    expect(routesCtrl.valid).toBeFalsy();
    expect(classTypeCtrl.valid).toBeFalsy();
  });
});
