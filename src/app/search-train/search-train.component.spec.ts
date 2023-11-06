import { Router } from '@angular/router';
import { GeneralTypesEnum } from '../core/module/enum/general-types.enum';
import {
  TravelTrainTypesEnum,
  TravelTypesEnum,
} from '../core/module/enum/travel-types.enum';
import { TestInitialize } from '../core/utils/test';
import { SearchTrainComponent } from './search-train.component';

describe('SUT: SearchTrainComponent', () => {
  let sut: SearchTrainComponent;
  let router: jasmine.SpyObj<Router>;
  router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
  sut = new SearchTrainComponent(router);

  const initializeForm = {
    route: null,
    passengers: null,
    general: null,
    travelType: TravelTypesEnum.OneWay,
  };

  TestInitialize.unitTestInitialize(sut, initializeForm, '/result-train');
  TestInitialize.ShouldBeSetWithProperValueWhenConstructorCalled(
    sut.generalTypes,
    [
      { title: 'General', value: GeneralTypesEnum.General },
      { title: 'Men Only', value: GeneralTypesEnum.MenOnly },
      { title: 'Women Only', value: GeneralTypesEnum.WomenOnly },
    ],
    'generalTrainTypes'
  );

  TestInitialize.ShouldBeSetWithProperValueWhenConstructorCalled(
    sut.travelTypes,
    [
      { title: 'One Way', value: TravelTrainTypesEnum.OneWay },
      { title: 'Round Trip', value: TravelTrainTypesEnum.RoundTrip },
    ],
    'travelTrainTypes'
  );
  TestInitialize.initializeForm(sut, initializeForm);
  TestInitialize.validFormTests(
    sut,
    router.navigate,
    {
      route: {
        departureDate: new Date(),
        returnDate: new Date('2023/11/10'),
        origin: 'Abadan',
        destination: 'Abu Musa',
      },
      passengers: { Adult: 1, Child: 1, Infant: 1 },
      general: GeneralTypesEnum.General,
      travelType: TravelTypesEnum.OneWay,
    },
    '/result-train'
  );
  TestInitialize.invalidForm(sut, { passengers: null });
});
