import { SearchFlightConst } from 'src/app/core/module/interface/search-flight.spec.const';
import { ClassTypesEnum } from '../../core/module/enum/class-types.enum';
import { TravelTypesEnum } from '../../core/module/enum/travel-types.enum';
import { SearchFlightComponent } from './search-flight.component';
import { SearchFlightFormBuilder } from './search-flight.component.spec.builder';
import { BaseFormTestFunc } from 'src/app/core/constant/base-unit-test/base-form.spec.func';

describe('SUT: SearchFlightComponent', () => {
  let sut: SearchFlightComponent;
  let sutBuilder: SearchFlightFormBuilder;

  beforeEach(() => {
    sutBuilder = new SearchFlightFormBuilder();
  });

  BaseFormTestFunc(() => sutBuilder);

  it('should be set classFlightTypes with proper value when constructor called', () => {
    // arrange 
    sut = sutBuilder.build()

    // assert
    expect(sut.classTypes).toEqual([
      { title: 'First Class', value: ClassTypesEnum.FirstClass },
      { title: 'Business', value: ClassTypesEnum.Business },
      { title: 'Economy', value: ClassTypesEnum.Economy },
      { title: 'Premium Class', value: ClassTypesEnum.PremiumClass },
    ]);
  });

  it('should be set travelFlightTypes with proper value when constructor called', () => {
    // arrange 
    sut = sutBuilder.build()

    // assert 
    expect(sut.travelTypes).toEqual([
      { title: 'One Way', value: TravelTypesEnum.OneWay },
      { title: 'Round Trip', value: TravelTypesEnum.RoundTrip },
      { title: 'Multi Path', value: TravelTypesEnum.MultiPath },
    ]);
  });

  it('should be when submit routing to `/result-flight` with condition valid form', () => {
    // arrange
    sut = sutBuilder.with_some_valid_data_for_form(SearchFlightConst.SomeSearchFlight).build()

    // act
    sut.submit();

    // assert
    expect(sutBuilder.router.navigate).toHaveBeenCalledWith(['/result-flight']);
  });

  it('should be check form is invalid', () => {
    // arrange
    sut = sutBuilder.with_some_invalid_data_for_form(SearchFlightConst.SomeInvalidSearchFlight).build()
    sut.form.markAsPristine();

    // act
    sut.submit();

    // assert
    expect(sut.form.dirty).toBeTrue();
    expect(sut.form.touched).toBeTrue();
  });

  it('should validate "fomControl" field as required', () => {
    // arrange
    sut = sutBuilder.with_data_for_form({
      passengers: null, routes: null, classType: null
    } as any).build();

    // assert
    expect(sut.form.controls.passengers.valid).toBeFalsy();
    expect(sut.form.controls.routes.valid).toBeFalsy();
    expect(sut.form.controls.classType.valid).toBeFalsy();
  });
});
