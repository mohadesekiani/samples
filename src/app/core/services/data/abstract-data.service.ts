import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractDataService {
  abstract getFakedata(searchValue: string): Observable<any>;
}
