import { Router } from '@angular/router';
import { ClassTypesEnum } from '../core/module/enum/class-types.enum';
import { TravelTypesEnum } from '../core/module/enum/travel-types.enum';
import { TestInitialize } from '../core/utils/test';
import { SearchFlightComponent } from './search-flight.component';

describe('SUT: SearchFlightComponent', () => {
  let sut: SearchFlightComponent;
  let router: jasmine.SpyObj<Router>;
  router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
  sut = new SearchFlightComponent(router);
  const initializeForm = {
    routes: null,
    passengers: null,
    travelType: 'OneWay',
    classType: null,
  };
  TestInitialize.unitTestInitialize(sut, initializeForm, '/result-flight');
  TestInitialize.ShouldBeSetWithProperValueWhenConstructorCalled(
    sut.classTypes,
    [
      { title: 'First Class', value: ClassTypesEnum.FirstClass },
      { title: 'Business', value: ClassTypesEnum.Business },
      { title: 'Economy', value: ClassTypesEnum.Economy },
      { title: 'Premium Class', value: ClassTypesEnum.PremiumClass },
    ],
    'classFlightTypes'
  );
  TestInitialize.ShouldBeSetWithProperValueWhenConstructorCalled(
    sut.travelTypes,
    [
      { title: 'One Way', value: TravelTypesEnum.OneWay },
      { title: 'Round Trip', value: TravelTypesEnum.RoundTrip },
      { title: 'Multi Path', value: TravelTypesEnum.MultiPath },
    ],
    'travelTypesFlight'
  );
  TestInitialize.initializeForm(sut, initializeForm);
  // const path='/result-flight';
  // it(`should be when submit routing to ${path} with condition valid form `, () => {
  //   // arrange
  //   sut.resultUrl = path;
  //   sut.form.setValue({
  //     routes: {
  //       travelType: TravelTypesEnum.OneWay,
  //       routes: [
  //         {
  //           origin: 'San Antonio',
  //           destination: 'San Antonio',
  //           departureDate: '2023-09-04T11:53:30.877Z',
  //           returnDate: '2023-09-04T11:53:30.877Z',
  //         },
  //       ],
  //     },
  //     passengers: { Adult: 1, Child: 1, Infant: 1 },
  //     travelType: 'OneWay',
  //     classType: 'FirstClass',
  //   });

  //   // act
  //   sut.submit();

  //   // assert
  //   expect(router).toHaveBeenCalledWith([path]);
  // });
  TestInitialize.validFormTests(
    sut,
    router.navigate,
    {
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
    },
    '/result-flight'
  );

  TestInitialize.invalidForm(sut, { passengers: null });
});
