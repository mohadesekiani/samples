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
    let acutal: Array<string> = [];
    debugger
    sut.getFakedata(searchValue).subscribe((res) => {
      debugger
      acutal = res;
    });
    tick(3000);
    expect(acutal).toEqual(expectedResults);
    console.log(acutal);
  }));

  it('should filter data based on search value by async', async () => {
    // arrange
    const expectedResults = ['San Antonio', 'San Diego', 'San Jose'];

    // act
    const acutal = await lastValueFrom(sut.getFakedata('San'));

    // assert
    expect(acutal).toEqual(expectedResults);
  });

  it("should return an empty array for non-matching search value", async () => {
    // act
    const actual = await firstValueFrom(sut.getFakedata('kiani'));

    // assert
    expect(actual).toEqual([])
  });

});
