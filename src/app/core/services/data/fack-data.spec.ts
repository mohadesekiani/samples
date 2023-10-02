import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { FakeDataService } from './fake-data.service';

describe('SUT: FakeDataService', () => {
  let sut: FakeDataService;
  beforeEach(() => {
    sut = new FakeDataService();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should filter data based on search value', fakeAsync(() => {
    const searchValue = 'Isf';
    const expectedResults = [
      {
        id: '315768d5-57d9-47da-a6c3-bed05ec8a890',
        title: 'Isfahan',
        alternateTitle: 'اصفهان',
        code: 'IFN',
        type: 'GeographicalLocation',
        subType: 'City',
        cityId: null,
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
      },
      
    ];
    let actual: any = [];

    sut.getFakeData(searchValue).subscribe((res) => {
      actual = res;
    });

    tick(3000);
    console.log(actual);
    
    expect(actual).toEqual(expectedResults);
  }));

  it('should filter data based on search value by async', async () => {
    // arrange
    const expectedResults = [
      {
        id: '315768d5-57d9-47da-a6c3-bed05ec8a890',
        title: 'Isfahan',
        alternateTitle: 'اصفهان',
        code: 'IFN',
        type: 'GeographicalLocation',
        subType: 'City',
        cityId: null,
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
      },
    ];
    // act
    const actual = await lastValueFrom(sut.getFakeData('Isf'));

    // assert
    expect(actual).toEqual(expectedResults);
  });

  it('should return an empty array for non-matching search value', async () => {
    // act
    const actual = await firstValueFrom(sut.getFakeData('kiani'));

    // assert
    expect(actual).toEqual([]);
  });
});
