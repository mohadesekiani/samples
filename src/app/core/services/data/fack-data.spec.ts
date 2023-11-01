import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { FakeDataService } from './fake-data.service';
import { ICity } from '../../module/interface/city-type.interface';

fdescribe('SUT: FakeDataService', () => {
  let sut: FakeDataService;
  beforeEach(() => {
    sut = new FakeDataService();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should filter data based on search value', fakeAsync(() => {
    const searchValue = 'Abu Musa Island Airport';
    const expectedResults = [
      {
        id: 'bdebddba-f11e-452d-a2d7-81188acecac1',
        title: 'Abu Musa Island Airport',
        alternateTitle: 'فرودگاه جزیره ابوموسی',
        code: 'AEU',
        type: 'Facility',
        subType: 'Airport',
        cityId: 'b1b86ea7-8fb4-4eec-9fe0-5f2ea03af777',
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 3,
        class: 'EconomicGrade',
        time: 600,
        company:'Chabahar'
      },
    ];
    let actual: any = [];

    sut.getFakeData(searchValue).subscribe((res) => {
      actual = res;
    });

    tick(3000);
    expect(actual).toEqual(expectedResults);
  }));

  it('should filter data based on search value by async', async () => {
    // arrange
    const expectedResults = [
      {
        id: 'bdebddba-f11e-452d-a2d7-81188acecac1',
        title: 'Abu Musa Island Airport',
        alternateTitle: 'فرودگاه جزیره ابوموسی',
        code: 'AEU',
        type: 'Facility',
        subType: 'Airport',
        cityId: 'b1b86ea7-8fb4-4eec-9fe0-5f2ea03af777',
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 3,
        class: 'EconomicGrade',
        time: 600,
        company:'Chabahar'
      },
    ];

    // act
    const actual = await lastValueFrom(sut.getFakeData('Abu Musa Is'));

    // assert
    expect(actual).toEqual(expectedResults);
  });

  it('should return an empty array for non-matching search value', async () => {
    // act
    const actual = await firstValueFrom(sut.getFakeData('kiani'));

    // assert
    expect(actual).toEqual([]);
  });

  it('should return an observable of fake cities data', () => {
    const expectedResults = [
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
      {
        id: 'b1b86ea7-8fb4-4eec-9fe0-5f2ea03af777',
        title: 'Abu Musa',
        alternateTitle: 'ابوموسی',
        code: 'AEU',
        type: 'GeographicalLocation',
        subType: 'City',
        cityId: null,
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 2,
        class: 'EconomicGrade',
        time: 1000,
        company: 'Mahan',
      },
      {
        id: 'bdebddba-f11e-452d-a2d7-81188acecac1',
        title: 'Abu Musa Island Airport',
        alternateTitle: 'فرودگاه جزیره ابوموسی',
        code: 'AEU',
        type: 'Facility',
        subType: 'Airport',
        cityId: 'b1b86ea7-8fb4-4eec-9fe0-5f2ea03af777',
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 3,
        class: 'EconomicGrade',
        time: 600,
        company: 'Chabahar',
      },
    ];
    let actual: ICity[] = [];

    sut.getAllFakeData().subscribe((res) => {
      actual = res;
    });
    expect(actual).toEqual(expectedResults);
  });
});
