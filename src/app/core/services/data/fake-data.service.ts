import { Injectable } from '@angular/core';
import * as fakeData from './mock-data';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FakeDataService {
  /**
   * recive filter serchvalue
   * @returns
   */

  public getFakedata(serchvalue: string): Observable<any> {
    return of(
      fakeData.cities.filter((city) => city.toLowerCase().includes(serchvalue))
    ).pipe(delay(3000));
  }
  constructor() {}
}
