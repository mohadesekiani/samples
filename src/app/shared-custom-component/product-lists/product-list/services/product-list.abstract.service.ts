import { Injectable, OnDestroy, inject } from '@angular/core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import {
  GetProductsInput,
  ProductDto,
  ProductService,
  ProductTypeDto,
  SelectedProductDto,
} from '@proxy/products';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ProcessGetItemDto } from '@proxy/process-management/process-management-home';
import { BuyProcessItem } from '@proxy/process-management/buy-process';
import { SupplyProcessItem } from '@proxy/process-management/supply-process';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractProductListViewService implements OnDestroy {
  protected readonly proxyService = inject(ProductService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  isVisibleSubject: Subject<boolean> = new Subject();
  isBusySubject: Subject<boolean> = new Subject();
  isResetSelectedTriggereed: Subject<boolean> = new Subject();

  data: PagedResultDto<ProductDto> = {
    items: [],
    totalCount: 0,
  };
  destroyed = new Subject();

  filters = {} as GetProductsInput;

  selectedItem: BuyProcessItem | SupplyProcessItem | null = null;

  private _selectedProducts = new BehaviorSubject<ProductDto[]>([]);

  get selectedProducts$() {
    return this._selectedProducts.asObservable();
  }
  set selectedProducts(newProducts: ProductDto[]) {
    this._selectedProducts.next(newProducts);
  }

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<ProductDto>) => {
      this.data = list;
    };

    this.list.hookToQuery(getData).pipe(takeUntil(this.destroyed)).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetProductsInput;
    this.list.get();
  }

  toggleSelectProduct(item: ProductDto) {
    const selectedItemIndex = this._selectedProducts.value.findIndex(
      selectedItem => selectedItem.id === item.id
    );

    if (selectedItemIndex === -1) {
      this.selectedProducts = [...this._selectedProducts.value, item];
    } else {
      this.selectedProducts = this._selectedProducts.value.filter(
        selected => selected.id !== item.id
      );
    }
  }

  // New method to handle saving selected items
  saveSelectedItems() {
    console.log('gee');
    // Implement your logic to save selected items
  }

  getSelectedItems(): SelectedProductDto[] {
    return this._selectedProducts.value;
  }

  resetSelectedProducts() {
    this.selectedProducts = [];
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
