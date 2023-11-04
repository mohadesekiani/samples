import { Observable } from 'rxjs';

export abstract class AbstractDataService {
  abstract getFakeData(searchValue: string): Observable<any>;
  abstract getAllFakeData():Observable<any>;
}
