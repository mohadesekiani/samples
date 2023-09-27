import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormComponent } from './reactive-form.component';
import { ClassTypesEnum } from '../models/class-types.enum';
import { TravelTypesEnum } from '../models/travel-types.enum';
import { Router } from '@angular/router';
import { IPassengerTypes } from '../models/passenger-types.interface';

describe('SUT: ReactiveFormComponent', () => {
  type FlightFormGroup = FormGroup;
  let sut: ReactiveFormComponent;
  let fb: FormBuilder;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    fb = new FormBuilder();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
    sut = new ReactiveFormComponent(fb, router);
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
    //TODO fixme should be not setValue
    sut.flightForm.patchValue({
      passengers: null,
    });
    // act
    sut.submit();
    // assert
    expect(window.alert).toHaveBeenCalledWith('فرم ثبت نشد');
  });

});

// 9-4-20223
//@failure comment prettify
//@failure format
//@failure hardcode
