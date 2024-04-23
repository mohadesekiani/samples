import { Component, OnInit, inject } from '@angular/core';
import { BusinessRoleListsViewService } from '../services/business-role-lists.service';

@Component({
  template: '',
})
export abstract class AbstractBusinessRoleListsComponent implements OnInit {
  public readonly service = inject(BusinessRoleListsViewService);

  protected title = '::BusinessRoleLists';

  ngOnInit() {
    this.service.hookToQuery();
  }
}
