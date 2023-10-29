import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFlightComponent } from './result-flight.component';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { of } from 'rxjs';
import { ClassesTypesFlightEnum } from 'src/app/core/module/enum/general-types.enum';
import { IFilterFlight } from 'src/app/core/module/interface/search-types.interface';

fdescribe('SUT: ResultFlightComponent', () => {
  let sut: ResultFlightComponent;
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
    },
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
      price: 10,
      class: 'CommercialGrade',
      time: 1320,
    },
  ];
  const dataService = jasmine.createSpyObj<AbstractDataService>({
    getAllFakeData: of(fakeCities),
  });
  beforeEach(() => {
    sut = new ResultFlightComponent(dataService);
    sut.ngOnInit();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
  it('should be default data', () => {
    // arrange
    const expectedValue: IFilterFlight = {
      timeRange: { startTime: 300, endTime: 1320 },
      priceRange: { minPrice: 0, maxPrice: 10 },
      class: null,
      airline: '',
    };

    // act
    sut.receiveData(expectedValue);

    // assert
    expect(sut.filterData).toEqual(expectedValue);
  });

  it(`should be have all the cities when we don't have a filter`, () => {
    // assert
    expect(sut.filteredItems).toEqual(fakeCities);
    expect(sut.allData).toEqual(fakeCities);
  });

  it('should be when call receiveData calling applyFilter', () => {
    // arrange
    spyOn(sut as any, 'applyFilter');
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
    };

    // act
    sut.receiveData(expectedValue);

    // assert
    expect((sut as any).applyFilter).toHaveBeenCalled();
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
    };

    // act
    sut.receiveData(expectedValue);

    // assert
    expect((sut as any).timeCombinePrice).toHaveBeenCalled();
    expect(sut.allData).toEqual(fakeCities);
  });

  it('should be when have not class no calling selectedClass', () => {
    // arrange
    spyOn(sut as any, 'selectedClass');
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
    };

    // act
    sut.receiveData(expectedValue);

    // assert
    expect((sut as any).selectedClass).not.toHaveBeenCalled();
    expect(sut.filteredItems).toEqual(fakeCities);
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
      class: ['Classy'],
      airline: '',
    };

    // act
    sut.receiveData(filter);

    // assert
    expect(sut.filteredItems).toEqual([
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
    };

    // act
    sut.receiveData(filter);

    // assert
    expect(sut.filteredItems).toEqual([
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
    };

    // act
    sut.receiveData(filter);

    // assert
    expect(sut.filteredItems).toEqual([
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
    };

    // act
    sut.receiveData(filter);

    // assert
    expect(sut.filteredItems).toEqual([
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
      },
    ]);
  });
});
