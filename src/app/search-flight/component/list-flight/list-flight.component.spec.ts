import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFlightComponent } from './list-flight.component';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { of } from 'rxjs';

describe('SUT: ListFlightComponent', () => {
  let sut: ListFlightComponent;
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
      company:'Mahan'
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
      company:'Mahan'
    },
  ];
  const dataService = jasmine.createSpyObj<AbstractDataService>({
    getAllFakeData: of(fakeCities),
  });
  beforeEach(() => {
    sut = new ListFlightComponent(dataService);
    sut.ngOnInit();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should be allItem to be fakeCities', () => {
    // assert
    expect(sut.allItem).toEqual(fakeCities);
  });

  //TODO نوشتن تست برای اینپوت ها
  it('should set filteredItems when input property is set', () => {
    // arrange
    const fakeFilteredItems: ICity[] = [
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
    ];
    // act
    sut.filteredItems = fakeFilteredItems;

    // assert
    expect(sut.filteredItems).toEqual(fakeFilteredItems);
  });
});
