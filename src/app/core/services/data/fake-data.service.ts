import { Injectable } from '@angular/core';
import * as fakeData from './mock-data';
import { delay, Observable, of } from 'rxjs';
import { AbstractDataService } from './abstract-data.service';

@Injectable({
  providedIn: 'root',
})
export class FakeDataService extends AbstractDataService {
  constructor() {
    super();
  }

  /**
   * receive filter searchValue
   * @returns
   */

  public getFakeData(searchValue: string): Observable<any> {
    return of(
      fakeData.cities.filter((city) => city.title.toLowerCase().includes(searchValue.toLowerCase()))
    ).pipe(delay(0));
  }
}
