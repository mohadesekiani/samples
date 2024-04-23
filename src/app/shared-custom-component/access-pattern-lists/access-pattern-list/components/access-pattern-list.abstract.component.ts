import { Component, OnInit, inject } from '@angular/core';
import { AccessPatternListViewService } from '../services/access-pattern-list.service';

@Component({
  template: '',
})
export abstract class AbstractAccessPatternListComponent implements OnInit {
  public readonly service = inject(AccessPatternListViewService);

  protected title = '::AccessPatternLists';

  ngOnInit() {
    this.service.hookToQuery();
  }
}
