import { Observable } from 'rxjs';
import { ICity } from '../../module/interface/city-type.interface';

export abstract class AbstractDataService {
  abstract getFakeData(searchValue: string): Observable<any>;
  abstract getAllFakeData():Observable<any>;
}
