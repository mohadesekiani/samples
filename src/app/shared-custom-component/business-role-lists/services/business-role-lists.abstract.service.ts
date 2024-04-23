import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import {
  AccessPatternDto,
  AccessPatternService,
  GetAccessPatternsInput,
  SelectedAccessPatternDto,
} from '@proxy/access-patterns';

import { Subject, takeUntil } from 'rxjs';
import { RolesRegisterService } from '@proxy/role-register/roles';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractBusinessRoleListsListViewService implements OnDestroy {
  protected readonly proxyService = inject(RolesRegisterService);
  protected readonly list = inject(ListService);

  isVisibleSubject: Subject<boolean> = new Subject();
  isBusySubject: Subject<boolean> = new Subject();
  destroyed = new Subject();

  data: PagedResultDto<AccessPatternDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetAccessPatternsInput;

  selectedItems: SelectedAccessPatternDto[] = [];

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) => this.proxyService.getBusinessRoles();

    const setData = (list: PagedResultDto<AccessPatternDto>) => (this.data = list);
    this.list.hookToQuery(getData).pipe(takeUntil(this.destroyed)).subscribe(setData);
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
