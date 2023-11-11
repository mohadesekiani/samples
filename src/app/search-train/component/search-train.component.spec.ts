import { BaseFormTestFunc } from 'src/app/core/constant/base-unit-test/base-form.spec.func';
import { SearchTrainConst } from 'src/app/core/module/interface/search-train.spec.const';
import { GeneralTypesEnum } from '../../core/module/enum/general-types.enum';
import {
  TravelTrainTypesEnum,
  TravelTypesEnum,
} from '../../core/module/enum/travel-types.enum';
import { SearchTrainComponent } from './search-train.component';
import { SearchTrainFormBuilder } from './search-train.component.spec.builder';

describe('SUT: SearchTrainComponent', () => {
  let sut: SearchTrainComponent;
  let sutBuilder: SearchTrainFormBuilder

  beforeEach(() => {
    sutBuilder = new SearchTrainFormBuilder();
  });

  BaseFormTestFunc(() => sutBuilder);

  it('should be create properly', () => {
    // arrange
    sut = sutBuilder.build();

    // assert
    expect(sut).toBeTruthy();
    expect(sut.resultUrl).toBe('/result-train');
  });

  it('should be set generalTrainTypes with proper value when constructor called', () => {
    // arrange 
    sut = sutBuilder.build()

    // assert
    expect(sut.generalTypes).toEqual([
      { title: 'General', value: GeneralTypesEnum.General },
      { title: 'Men Only', value: GeneralTypesEnum.MenOnly },
      { title: 'Women Only', value: GeneralTypesEnum.WomenOnly },
    ]);
  });

  it('should be set travelTrainTypes with proper value when constructor called', () => {
    // arrange 
    sut = sutBuilder.build()

    // assert
    expect(sut.travelTypes).toEqual([
      { title: 'One Way', value: TravelTrainTypesEnum.OneWay },
      { title: 'Round Trip', value: TravelTrainTypesEnum.RoundTrip },
    ]);
  });

  it('should be create form with default value', () => {
    // arrange
    sut = sutBuilder.build();

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
    sut = sutBuilder.with_some_valid_data_for_form(SearchTrainConst.SomeSearchTrain).build();

    // act
    sut.submit();

    // assert
    expect(sut.form.dirty).toBe(false);
    expect(sutBuilder.router.navigate).toHaveBeenCalledWith(['/result-train']);
  });

  it('should validate "fomControl" field as required', () => {
    // arrange
    sut = sutBuilder.with_some_valid_data_for_form(SearchTrainConst.SomeSearchTrain).build()
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

  it('should be check form is invalid', () => {
    // arrange
    sut = sutBuilder.with_some_invalid_data_for_form(SearchTrainConst.SomeInvalidSearchTrain).build()
    sut.form.markAsPristine();

    // act
    sut.submit();

    // assert
    expect(sut.form.dirty).toBeTrue();
    expect(sut.form.touched).toBeTrue();
  });
});
