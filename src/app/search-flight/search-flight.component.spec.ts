import { ClassTypesEnum } from '../core/module/enum/class-types.enum';
import { TravelTypesEnum } from '../core/module/enum/travel-types.enum';
import { SearchFlightComponent } from './search-flight.component';
import { SearchFlightFormBuilder } from './search-flight.component.spec.builder';

fdescribe('SUT: SearchFlightComponent', () => {
  let sut: SearchFlightComponent;
  const sutBuilder = new SearchFlightFormBuilder()


  it('should be create properly', () => {
    // arrange
    sut = sutBuilder.build();

    // assert 
    expect(sut).toBeTruthy();
    expect(sut.resultUrl).toBe('/result-flight');
  });

  it('should be set classFlightTypes with proper value when constructor called', () => {
    // arrange 
    sut= sutBuilder.build() 

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
    sut= sutBuilder.build() 

    // assert 
    expect(sut.travelTypes).toEqual([
      { title: 'One Way', value: TravelTypesEnum.OneWay },
      { title: 'Round Trip', value: TravelTypesEnum.RoundTrip },
      { title: 'Multi Path', value: TravelTypesEnum.MultiPath },
    ]);
  });

  xit('should be create form with default value', () => {
    // arrange
    sut = sutBuilder.build();

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
    sut = sutBuilder.with_some_valid_data_for_form().build()

    // act
    sut.submit();

    // assert
    expect(sutBuilder.router.navigate).toHaveBeenCalledWith(['/result-flight']);
  });

  it('should be check form is invalid', () => {
    // arrange
    sut = sutBuilder.with_some_invalid_data_for_form().build()
    sut.form.markAsPristine();

    // act
    sut.submit();

    // assert
    expect(sut.form.dirty).toBeTrue();
    expect(sut.form.touched).toBeTrue();
  });

  it('should validate "fomControl" field as required', () => {
    // arrange
    sut = sutBuilder.with_some_valid_data_for_form().build()
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
