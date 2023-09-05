import { FormBuilder } from "@angular/forms";
import { ReactiveFormComponent } from "./reactive-form.component";
import { ClassTypesEnum } from "../models/class-types.enum";
import { TravelTypesEnum } from "../models/travel-types.enum";
import { Router } from "@angular/router";
import { IPassengerTypes } from "../shared/elements/form/fields/passengers/passengers";

fdescribe('SUT: ReactiveFormComponent', () => {
  let sut: ReactiveFormComponent;
  let fb: FormBuilder;
  let router: jasmine.SpyObj<Router>;
  let flightForm;

  beforeEach(() => {
    fb = new FormBuilder();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    sut = new ReactiveFormComponent(fb, router);
    sut.today = new Date();
    sut.ngOnInit();
    flightForm = sut.flightForm;
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
    expect(sut.classTypes).toEqual([
      { title: 'First Class', value: ClassTypesEnum.FirstClass },
      { title: 'Business', value: ClassTypesEnum.Business },
      { title: 'Economy', value: ClassTypesEnum.Economy },
      { title: 'Premium Class', value: ClassTypesEnum.PremiumClass }
    ]);
  });

  it('should be create form with default value', () => {
    // arrange
    const expectedFormValue = {
      passengers: null,
      travelType: TravelTypesEnum.OneWay,
      departureDate: sut.today,
      origin: null,
      destination: null,
      classType: null
    };
    const expectedRawFormValue1 = {
      returnDate: null
    };
    const expectedRawFormValue = {
      ...expectedFormValue,
      returnDate: null
    };

    // assert
    //NOTICE
    expect(sut.flightForm.getRawValue()).toEqual(jasmine.objectContaining(expectedRawFormValue1));
    expect(sut.flightForm.getRawValue()).toEqual(expectedRawFormValue);
    expect(sut.flightForm.value).toEqual(expectedFormValue);
  });

  it('should be set required error to origin controller when origin is empty', () => {
    // arrange
    const origin = sut.flightForm.get('origin');
    // act
    origin?.setValue(null);
    // assert
    expect(origin?.hasError('required')).toBeTrue();
  });

  it('should be not set required error to origin controller when origin has proper value', () => {
    // arrange
    const origin = sut.flightForm.get('origin');
    // act
    origin?.setValue('some_text');
    // assert
    expect(origin?.hasError('required')).toBeFalse();
  });

  it('should be enabled returnDate controller when travelType is RoundTrip', () => {
    // arrange
    const travelType = flightForm.get('travelType');
    const returnDate = flightForm.get('returnDate');
    // act
    travelType?.setValue(TravelTypesEnum.RoundTrip);
    // assert
    expect(returnDate?.enabled).toBeTrue();
  });

  it('should be disabled returnDate controller when travelType is OneWay', () => {
    // arrange
    const travelType = flightForm.get('travelType');
    const returnDate = flightForm.get('returnDate');
    travelType?.setValue(TravelTypesEnum.RoundTrip);

    // act
    travelType?.setValue(TravelTypesEnum.OneWay);

    // assert
    expect(returnDate?.disabled).toBeTrue();
  });
  // onSubmit
  it('should check form is valid then go to result page ', () => {
    // arrange
    flightForm.setValue({
      passengers: { Adult: 1, Children: 1, Infant: 1 },
      travelType: "OneWay",
      departureDate: "2023-09-04T11:53:30.877Z",
      origin: "San Antonio",
      returnDate: "2023-09-04T11:53:30.877Z",
      destination: "San Antonio",
      classType: "FirstClass"
    })
    // act
    sut.submit();
    // assert
    expect(router.navigate).toHaveBeenCalledWith(['/Train']);
  });

  it('should check form is valid then go to result alert', () => {
    // arrange
    spyOn(window, 'alert');
    //TODO fixme should be not setValue
    sut.flightForm.patchValue({
      passengers: { Adult: 0, Child: 0, Infant: 0 },
    })
    // act
    sut.submit();
    // assert
    expect(window.alert).toHaveBeenCalledWith('فرم ثبت نشد');
  });

  it(`should be the number of infants is greater than the number of adults,
  the passenger count error must be adjusted in the flight form`, () => {
    // arrange
    sut.flightForm.get('passengers')?.setValue({ Adult: 1, Child: 0, Infant: 2 } as IPassengerTypes)
    // act
    sut.flightForm.get('passengers')?.markAsTouched();
    sut.submit()
    // assert
    // expect(sut.flightForm.getError('passengers')).toBeTrue();
    // expect(sut.flightForm.get('passengers')?.errors).toBeTrue();
    expect(sut.flightForm.hasError('InfantGreaterThanAdults')).toBeTrue();
  });

  it('should be necessary to fill in the passengers field', () => {
    // arrange
    const passengers = sut.flightForm.get('passengers');
    // act
    passengers?.setValue( { "Adult": 4, "Child": 0, "Infant": 0 });
    // assert
    expect(passengers?.hasError('required')).toBeFalse();
  });

  it('should be necessary to fill in the returnDate field', () => {
    // arrange
    const returnDate = sut.flightForm.get('returnDate');
    // act
    returnDate?.setValue("2023-09-05T08:21:42.506Z");
    // assert
    expect(returnDate?.hasError('required')).toBeFalse();
  });

});

// 9-4-20223
//@failure comment prettify
//@failure format
//@failure hardcode

