import { Injectable, OnDestroy, inject } from '@angular/core';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import {
  AccessPatternDto,
  AccessPatternService,
  GetAccessPatternsInput,
  SelectedAccessPatternDto,
} from '@proxy/access-patterns';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

type Mode = 'create' | 'update' | 'show';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractAccessPatternListViewService implements OnDestroy {
  protected readonly proxyService = inject(AccessPatternService);
  protected readonly list = inject(ListService);

  isVisibleSubject: Subject<boolean> = new Subject();
  isBusySubject: Subject<boolean> = new Subject();
  isResetSelectedTriggereed: Subject<boolean> = new Subject();
  isFilteredSubject: Subject<boolean> = new Subject();

  data: PagedResultDto<AccessPatternDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetAccessPatternsInput;
  destroyed = new Subject();

  selectedNodes: SelectedAccessPatternDto[] = [];

  private _mode = new BehaviorSubject<Mode>('create');

  get mode$() {
    return this._mode.asObservable();
  }
  set mode(mode: Mode) {
    this._mode.next(mode);
  }

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<AccessPatternDto>) => (this.data = list);
    this.list.hookToQuery(getData).pipe(takeUntil(this.destroyed)).subscribe(setData);
  }
  getSelectedNodes(): AccessPatternDto[] {
    return this.selectedNodes;
  }

  resetSelectedNodes() {
    this.selectedNodes = null;
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
