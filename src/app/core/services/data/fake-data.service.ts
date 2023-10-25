import { Injectable } from '@angular/core';
import * as fakeData from './mock-data';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { AbstractDataService } from './abstract-data.service';
import { ICity } from '../../module/interface/city-type.interface';

@Injectable({
  providedIn: 'root',
})
export class FakeDataService extends AbstractDataService {
  constructor() {
    super();
  }
  private itemsSubject = new BehaviorSubject<ICity[]>([]);
  items$ = this.itemsSubject.asObservable();
  /**
   * receive filter searchValue
   * @returns
   */

  public getFakeData(searchValue: string): Observable<any> {
    return of(
      fakeData.cities.filter((city) =>
        city.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    ).pipe(delay(0));
  }
  public getAllFakeData() {
    
    return this.itemsSubject.next(fakeData.cities);
  }
}
