import { FormBuilder } from '@angular/forms';
import { ReactiveFormComponent } from './reactive-form.component';
import { ClassTypesEnum } from '../models/class-types.enum';
import { TravelTypesEnum } from '../models/travel-types.enum';
import { Router } from '@angular/router';
import { IPassengerTypes } from '../models/passenger-types.interface';

describe('SUT: ReactiveFormComponent', () => {
  let sut: ReactiveFormComponent;
  let fb: FormBuilder;
  let router: jasmine.SpyObj<Router>;
  let flightFormCtrl;
  let flightForm;
  beforeEach(() => {
    fb = new FormBuilder();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    sut = new ReactiveFormComponent(fb, router);
    sut.today = new Date();
    sut.ngOnInit();
    flightFormCtrl = sut.flightForm.controls;
    flightForm = sut.flightForm;
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
    // const expectedRawFormValue1 = {
    //   returnDate: null,
    // };
    // const expectedRawFormValue = {
    //   ...expectedFormValue,
    //   returnDate: null,
    // };

    // assert
    // NOTICE
    // expect(sut.flightForm.getRawValue()).toEqual(
    //   jasmine.objectContaining(expectedRawFormValue)
    // );
    // expect(sut.flightForm.getRawValue()).toEqual(expectedRawFormValue);
    expect(sut.flightForm.value).toEqual(expectedFormValue);
  });

  // it('should be set required error to origin controller when origin is empty', () => {
  //   // arrange
  //   const origin = flightFormCtrl.origin;
  //   // act
  //   origin?.setValue(null);
  //   // assert
  //   expect(origin?.hasError('required')).toBeTrue();
  // });

  // it('should be not set required error to origin controller when origin has proper value', () => {
  //   // arrange
  //   const origin = flightFormCtrl.origin;
  //   // act
  //   origin?.setValue('some_text');
  //   // assert
  //   expect(origin?.hasError('required')).toBeFalse();
  // });

  // it('should be enabled returnDate controller when travelType is RoundTrip', () => {
  //   // arrange
  //   const travelType = flightFormCtrl.travelType;
  //   const returnDate = flightFormCtrl.returnDate;
  //   // act
  //   travelType?.setValue(TravelTypesEnum.RoundTrip);
  //   // assert
  //   expect(returnDate.enabled).toBeTrue();
  // });

  // it('should be disabled returnDate controller when travelType is OneWay', () => {
  //   // arrange
  //   const travelType = flightFormCtrl.travelType;
  //   const returnDate = flightFormCtrl.returnDate;
  //   travelType?.setValue(TravelTypesEnum.RoundTrip);
  //   // act
  //   travelType?.setValue(TravelTypesEnum.OneWay);

  //   // assert
  //   expect(returnDate.disabled).toBeTrue();
  // });
  // onSubmit
  it('should check form is valid then go to result page ', () => {
    // arrange
    flightForm.setValue({
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
    //TODO fixme should be not setValue
    sut.flightForm.patchValue({
      passengers: null,
    });
    // act
    sut.submit();
    // assert
    expect(window.alert).toHaveBeenCalledWith('فرم ثبت نشد');
  });

  xit(`should be the number of infants is greater than the number of adults,
  the passenger count error must be adjusted in the flight form`, () => {
    // arrange
    flightFormCtrl.passengers.setValue({
      Adult: 1,
      Child: 0,
      Infant: 2,
    } as IPassengerTypes);
    // act
    // sut.flightForm.get('infantGreaterThanAdults.markAsTouched();
    // expect(sut.flightForm.getError('infantGreaterThanAdults')).toBeTrue();
    // expect(sut.flightForm.get('infantGreaterThanAdults')?.errors).toBeTrue();
    expect(sut.flightForm.hasError('infantGreaterThanAdults')).toBeTrue();
  });

  // it('should be necessary to fill in the returnDate field', () => {
  //   // arrange
  //   const returnDate = sut.flightForm.controls.returnDate;
  //   // act
  //   returnDate?.setValue('2023-09-05T08:21:42.506Z');
  //   // assert
  //   expect(returnDate?.hasError('required')).toBeFalse();
  // });
});

// 9-4-20223
//@failure comment prettify
//@failure format
//@failure hardcode
