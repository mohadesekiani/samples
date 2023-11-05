import { of } from 'rxjs';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { IFilterFlight } from 'src/app/core/module/interface/search-types.interface';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { ResultFlightComponent } from './result-flight.component';
import { FormBuilder } from '@angular/forms';

describe('SUT: ResultFlightComponent', () => {
  let sut: ResultFlightComponent;
  let fb: FormBuilder;

  const fakeCities: ICity[] = [
    {
      id: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
      title: 'Abadan',
      alternateTitle: 'آبادان',
      code: 'ABD',
      type: 'GeographicalLocation',
      subType: 'City',
      cityId: null,
      countryCode: 'IR',
      countryTitle: 'Iran (Islamic Republic of)',
      countryAlternateTitle: 'ايران',
      price: 5,
      class: 'Classy',
      time: 300,
      company: 'Mahan',
    },
    {
      id: '2e63cb40-d5f2-4975-a9ef-e6588d1fa503',
      title: 'Abadan Intl Airport',
      alternateTitle: 'فرودگاه آبادان',
      code: 'ABD',
      type: 'Facility',
      subType: 'Airport',
      cityId: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
      countryCode: 'IR',
      countryTitle: 'Iran (Islamic Republic of)',
      countryAlternateTitle: 'ايران',
      price: 10,
      class: 'CommercialGrade',
      time: 1320,
      company: 'Caspian',
    },
  ];
  fb = new FormBuilder();
  const dataService = jasmine.createSpyObj<AbstractDataService>({
    getAllFakeData: of(fakeCities),
  });
  beforeEach(() => {
    sut = new ResultFlightComponent(dataService, fb);
    sut.ngOnInit();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
  it('should be value form', () => {
    expect(sut.form).toBeTruthy();
  });

  xit('should be default data filter', () => {
    // arrange
    const expectedValue: IFilterFlight = {
      timeRange: { startTime: 300, endTime: 1320 },
      priceRange: { minPrice: 0, maxPrice: 10 },
      class: null,
      airline: '',
      company: null,
    };

    // assert
    expect(sut.form.value.filter).toEqual(expectedValue);
  });

  it(`should be have all the cities when we don't have a filter`, () => {
    // assert
    expect(sut.form.value.result).toEqual(fakeCities);
    expect(sut.allData).toEqual(fakeCities);
  });

  xit('should be when call ngOnInit calling applyFilter', () => {
    // arrange
    spyOn(sut as any, 'applyFilter');

    // act
    sut.ngOnInit();

    // assert
    expect((sut as any).applyFilter).toHaveBeenCalled();
  });

  it('should call subscribe to valueChanges during ngOnInit', () => {
    // arrange
    spyOn(sut.form.valueChanges, 'subscribe')

    // act
    sut.ngOnInit();

    // assert
    expect(sut.form.valueChanges.subscribe).toHaveBeenCalled();
  });

  it('should be when call applyFilter calling timeCombinePrice', () => {
    // arrange
    spyOn(sut as any, 'timeCombinePrice');
    const expectedValue = {
      timeRange: {
        startTime: 300,
        endTime: 1320,
      },
      priceRange: {
        minPrice: 0,
        maxPrice: 10,
      },
      class: null,
      airline: '',
      company: null,
    };

    // act
    // sut.receiveData(expectedValue);

    // assert
    expect((sut as any).timeCombinePrice).toHaveBeenCalled();
    expect(sut.allData).toEqual(fakeCities);
  });

  it('should be when have not class no calling selectedClass', () => {
    // arrange
    spyOn(sut as any, 'selectedCheckBox');
    const expectedValue = {
      timeRange: {
        startTime: 300,
        endTime: 1320,
      },
      priceRange: {
        minPrice: 0,
        maxPrice: 10,
      },
      class: null,
      airline: '',
      company: null,
    };

    // act
    // sut.receiveData(expectedValue);

    // assert
    expect((sut as any).selectedCheckBox).not.toHaveBeenCalled();
    expect(sut.form.value.result).toEqual(fakeCities);
  });

  it('should be filtered by class when class is selected', () => {
    // arrange
    const filter = {
      timeRange: {
        startTime: 300,
        endTime: 1320,
      },
      priceRange: {
        minPrice: 0,
        maxPrice: 10,
      },
      class: {
        Classy: true,
        CommercialGrad: false,
        EconomicGrade: false,
        PremiumGrade: false,
      },
      airline: '',
      company: null,
    };

    // act
    // sut.receiveData(filter);

    // assert
    expect(sut.form.value.result).toEqual([
      {
        id: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
        title: 'Abadan',
        alternateTitle: 'آبادان',
        code: 'ABD',
        type: 'GeographicalLocation',
        subType: 'City',
        cityId: null,
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 5,
        class: 'Classy',
        time: 300,
        company: 'Mahan',
      },
    ]);
  });

  it('should be filtered by timeRange when time is set', () => {
    // arrange
    const filter = {
      timeRange: {
        startTime: 300,
        endTime: 600,
      },
      priceRange: {
        minPrice: 0,
        maxPrice: 10,
      },
      class: null,
      airline: '',
      company: null,
    };

    // act
    // sut.receiveData(filter);

    // assert
    expect(sut.form.value.result).toEqual([
      {
        id: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
        title: 'Abadan',
        alternateTitle: 'آبادان',
        code: 'ABD',
        type: 'GeographicalLocation',
        subType: 'City',
        cityId: null,
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 5,
        class: 'Classy',
        time: 300,
        company: 'Mahan',
      },
    ]);
  });

  it('should be filtered by priceRange when time is set', () => {
    // arrange
    const filter = {
      timeRange: {
        startTime: 300,
        endTime: 1320,
      },
      priceRange: {
        minPrice: 0,
        maxPrice: 6,
      },
      class: null,
      airline: '',
      company: null,
    };

    // act
    // sut.receiveData(filter);

    // assert
    expect(sut.form.value.result).toEqual([
      {
        id: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
        title: 'Abadan',
        alternateTitle: 'آبادان',
        code: 'ABD',
        type: 'GeographicalLocation',
        subType: 'City',
        cityId: null,
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 5,
        class: 'Classy',
        time: 300,
        company: 'Mahan',
      },
    ]);
  });

  it('should be filtered by class,price,time', () => {
    // arrange
    const filter = {
      timeRange: {
        startTime: 300,
        endTime: 600,
      },
      priceRange: {
        minPrice: 0,
        maxPrice: 6,
      },
      class: ['Classy'],
      airline: '',
      company: null,
    };

    // act
    // sut.receiveData(filter);

    // assert
    expect(sut.form.value.result).toEqual([
      {
        id: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
        title: 'Abadan',
        alternateTitle: 'آبادان',
        code: 'ABD',
        type: 'GeographicalLocation',
        subType: 'City',
        cityId: null,
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 5,
        class: 'Classy',
        time: 300,
        company: 'Mahan',
      },
    ]);
  });

  it(`should be haven't class result to be []`, () => {
    // arrange
    const filter = {
      timeRange: {
        startTime: 300,
        endTime: 300,
      },
      priceRange: {
        minPrice: 10,
        maxPrice: 10,
      },
      class: ['PremiumGrade'],
      company: null,
      airline: '',
    };

    // act
    // sut.receiveData(filter);

    // assert
    expect(sut.form.value.result).toEqual([]);
  });

  it('should be filtered by company when company is selected', () => {
    // arrange
    const filter = {
      timeRange: {
        startTime: 300,
        endTime: 1320,
      },
      priceRange: {
        minPrice: 0,
        maxPrice: 10,
      },
      class: null,
      airline: '',
      company: {
        Mahan: false,
        Caspian: true,
        Chabahar: false,
      },
    };

    // act

    // assert
    expect(sut.form.value.result).toEqual([
      {
        id: '2e63cb40-d5f2-4975-a9ef-e6588d1fa503',
        title: 'Abadan Intl Airport',
        alternateTitle: 'فرودگاه آبادان',
        code: 'ABD',
        type: 'Facility',
        subType: 'Airport',
        cityId: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 10,
        class: 'CommercialGrade',
        time: 1320,
        company: 'Caspian',
      },
    ]);
  });
});
