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
    const searchValue = 'San';
    const expectedResults = ['San Antonio', 'San Diego', 'San Jose'];
    let actual: Array<string> = [];
    
    sut.getFakeData(searchValue).subscribe((res) => {
      debugger
      actual = res;
    });
    tick(3000);
    expect(actual).toEqual(expectedResults);
    console.log(actual);
  }));

  it('should filter data based on search value by async', async () => {
    // arrange
    const expectedResults = ['San Antonio', 'San Diego', 'San Jose'];

    // act
    const actual = await lastValueFrom(sut.getFakeData('San'));

    // assert
    expect(actual).toEqual(expectedResults);
  });

  it("should return an empty array for non-matching search value", async () => {
    // act
    const actual = await firstValueFrom(sut.getFakeData('kiani'));

    // assert
    expect(actual).toEqual([])
  });

});
