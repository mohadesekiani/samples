import { Observable } from 'rxjs';

export abstract class AbstractDataService {
  abstract items$ :any
  abstract getFakeData(searchValue: string): Observable<any>;
  abstract getAllFakeData():any;
}
