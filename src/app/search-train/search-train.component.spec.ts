import { FormBuilder } from '@angular/forms';
import { SearchTrainComponent } from './search-train.component';
import { Router } from '@angular/router';
import { GeneralTypesEnum } from '../core/module/enum/general-types.enum';
import {
  TravelTrainTypesEnum,
  TravelTypesEnum,
} from '../core/module/enum/travel-types.enum';
import { ValidationErrorService } from '../shared/services/validation-error.service';
import { TestInitialize } from '../core/utils/test';

fdescribe('SUT: SearchTrainComponent', () => {
  let sut: SearchTrainComponent;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
    sut = new SearchTrainComponent(router);
    TestInitialize.initializeTest(
      sut,
      {
        route: null,
        passengers: null,
        general: null,
        travelType: TravelTypesEnum.OneWay,
      },
      '/result-train'
    );
  });

  it('should be create', () => {
    // assert
    expect(sut).toBeTruthy();
    expect(sut.generalTypes).toEqual([
      { title: 'General', value: GeneralTypesEnum.General },
      { title: 'Men Only', value: GeneralTypesEnum.MenOnly },
      { title: 'Women Only', value: GeneralTypesEnum.WomenOnly },
    ]);
    expect(sut.travelTypes).toEqual([
      { title: 'One Way', value: TravelTrainTypesEnum.OneWay },
      { title: 'Round Trip', value: TravelTrainTypesEnum.RoundTrip },
    ]);
    expect(sut.path).toBe('/result-train');
  });

  it('should be set initialization form', () => {
    // assert
    expect(sut.form.value).toEqual({
      route: null,
      passengers: null,
      general: null,
      travelType: TravelTypesEnum.OneWay,
    });
  });

  it(`should be when submit routing to "result-train with condition valid form "`, () => {
    // arrange
    sut.path = '/result-train';
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
    spyOn(sut.form, 'markAllAsTouched');
    spyOn(sut.form, 'markAsDirty');
    sut.form.patchValue({
      passengers: null,
    });

    // act
    sut.submit();

    // assert
    expect(sut.form.markAllAsTouched).toHaveBeenCalled();
    expect(sut.form.markAsDirty).toHaveBeenCalled();
  });
});
