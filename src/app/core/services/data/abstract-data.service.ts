import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ABDataService {
  abstract getFakedata(searchValue: string): Observable<any>;
}
