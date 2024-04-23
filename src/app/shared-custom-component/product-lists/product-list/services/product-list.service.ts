import { Injectable } from '@angular/core';
import { AbstractProductListViewService } from './product-list.abstract.service';
import { BehaviorSubject, Subject } from 'rxjs';

export type Mode = 'update' | 'create' | 'show';

@Injectable({
  providedIn: 'root',
})
export class ProductListViewService extends AbstractProductListViewService {
  public productIdsSource = new Subject<number[]>();
  private _mode = new BehaviorSubject<Mode>('create');


  get mode$() {
    return this._mode.asObservable();
  }
  set mode(mode: Mode) {
    this._mode.next(mode);
  }
}
