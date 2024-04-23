import { ListService, TrackByService } from '@abp/ng.core';
import { Component, Input, OnInit, inject } from '@angular/core';

import { ProductListViewService } from '../services/product-list.service';

@Component({
  template: '',
})
export abstract class AbstractProductListComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(ProductListViewService);

  protected title = '::ProductLists';

  @Input() ShowSaveBottom = true;
  @Input() ShowCheckbox = true;

  ngOnInit() {
    this.service.hookToQuery();
    
  }

  clearFilters() {
    this.service.clearFilters();
  }


}
