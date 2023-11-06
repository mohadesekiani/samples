import { FormBuilder } from '@angular/forms';
import { SearchTrainComponent } from './search-train.component';
import { Router } from '@angular/router';
import { GeneralTypesEnum } from '../core/module/enum/general-types.enum';
import {
  TravelTrainTypesEnum,
  TravelTypesEnum,
} from '../core/module/enum/travel-types.enum';
import { ValidationErrorService } from '../shared/services/validation-error.service';

fdescribe('SUT: SearchTrainComponent', () => {
  let sut: SearchTrainComponent;
  let fb: FormBuilder;
  let router: jasmine.SpyObj<Router>;
  let validationErrorService: ValidationErrorService;

  beforeEach(() => {
    fb = new FormBuilder();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
    validationErrorService = new ValidationErrorService();
    sut = new SearchTrainComponent(router);
    sut.ngOnInit();
  });

  it('should be create properly', () => {
    // assert
    expect(sut).toBeTruthy();
    expect(sut.resultUrl).toBe('/result-train');
  });

  it('should be set generalTrainTypes with proper value when constructor called', () => {
    // assert
    expect(sut.generalTypes).toEqual([
      { title: 'General', value: GeneralTypesEnum.General },
      { title: 'Men Only', value: GeneralTypesEnum.MenOnly },
      { title: 'Women Only', value: GeneralTypesEnum.WomenOnly },
    ]);
  });

  it('should be set travelTrainTypes with proper value when constructor called', () => {
    // assert
    expect(sut.travelTypes).toEqual([
      { title: 'One Way', value: TravelTrainTypesEnum.OneWay },
      { title: 'Round Trip', value: TravelTrainTypesEnum.RoundTrip },
    ]);
  });

  it('should be create form with default value', () => {
    // assert
    expect(sut.form.value).toEqual({
      route: null,
      passengers: null,
      general: null,
      travelType: TravelTypesEnum.OneWay,
    });
  });

  it('should be when submit routing to `/result-train` with condition valid form', () => {
    // arrange
    sut.form.setValue({
      route: {
        departureDate: new Date(),
        returnDate: new Date('2023/11/10'),
        origin: 'Abadan',
        destination: 'Abu Musa',
      },
      passengers: { Adult: 1, Child: 1, Infant: 1 },
      general: GeneralTypesEnum.General,
      travelType: TravelTypesEnum.OneWay,
    });

    // act
    sut.submit();

    // assert
    expect(router.navigate).toHaveBeenCalledWith(['/result-train']);
  });

  it('should be check form is invalid ', () => {
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
    const routesCtrl = sut.form.controls.route;
    const generalCtrl = sut.form.controls.general;

    // act
    passengerCtrl.setValue(null);
    routesCtrl.setValue(null);
    generalCtrl.setValue(null);

    // assert
    expect(passengerCtrl.valid).toBeFalsy();
    expect(routesCtrl.valid).toBeFalsy();
    expect(generalCtrl.valid).toBeFalsy();
  });

  // it('should be when created form calling validation', () => {
  //   spyOn(validationErrorService,'process')
  //   // assert
  //   expect(validationErrorService.process(sut.form)).toHaveBeenCalled();
  // });
});
