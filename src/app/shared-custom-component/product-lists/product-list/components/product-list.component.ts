import { ListService, CoreModule, PagedResultDto } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  NgbDateAdapter,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { PageModule } from '@abp/ng.components/page';

import { Mode, ProductListViewService } from '../services/product-list.service';
import { AbstractProductListComponent } from './product-list.abstract.component';
import { ProductDto, ProductService, ProductTypeDto } from '@proxy/products';
import { Subject, catchError, take, takeUntil } from 'rxjs';
import { SupplyProcessViewService } from 'src/app/process-management/supply-process/services/supply-process.service';
import { SupplyProcessService } from '@proxy/process-management/supply-process';
import { ToasterHelperService } from '@proxy/toasterHelper/toaster-helper.service';

@Component({
  selector: 'app-product-list',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    CoreModule,
    ThemeSharedModule,
    CommercialUiModule,
    NgxValidateCoreModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    PageModule,
  ],
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent
  extends AbstractProductListComponent
  implements OnInit, OnDestroy
{
  protected readonly proxyService = inject(ProductService);
  protected readonly supplyProcessService = inject(SupplyProcessService);
  protected readonly productListService = inject(ProductListViewService);
  protected readonly supplyViewProcessService = inject(SupplyProcessViewService);
  protected readonly toastr = inject(ToasterHelperService);

  private readonly updateSuccessMsg = 'لیست به درستی به روزرسانی شد.';

  isBusy = false;
  isVisible = false;
  destroyed = new Subject();
  mode: Mode = 'create';
  selectedProducts: ProductDto[] = [];

  ngOnInit(): void {
    this.service.hookToQuery();

    this.service.selectedProducts$.pipe(takeUntil(this.destroyed)).subscribe(res => {
      this.selectedProducts = res;
    });

    this.productListService.mode$.pipe(takeUntil(this.destroyed)).subscribe(mode => {
      if (this.mode !== mode) {
        // on change mode
        this.setSelectedProducts([]);
        this.mode = mode;
      }

      if (mode !== 'create') {
        this.productListService.productIdsSource
          .pipe(takeUntil(this.destroyed))
          .subscribe(productIds => {
            this.setSelectedProductsByIds(productIds);
          });
      }
    });

    this.productListService.isVisibleSubject
      .pipe(takeUntil(this.destroyed))
      .subscribe(isVisible => {
        this.isVisible = isVisible;
      });
  }

  private productIdsSource = new Subject<number[]>();
  productIds$ = this.productIdsSource.asObservable();

  setSelectedProducts(products: ProductDto[]) {
    this.service.selectedProducts = products;
  }
  setSelectedProductsByIds(productIds: number[]) {
    this.service.selectedProducts = this.service.data.items
      .filter(item => productIds.includes(item.id))
      .map(item => item);
  }

  toggleSelectProduct(item: ProductDto) {
    this.service.toggleSelectProduct(item);
  }

  isItemSelected(item: any): boolean {
    return this.selectedProducts.some(selectedItem => selectedItem.id === item.id);
  }

  updateProductsList() {
    this.supplyProcessService
      .updateProductList({
        proceedingId: this.service.selectedItem.id,
        products: this.selectedProducts,
        isDisabled: true,
      })
      .pipe(take(1))
      .subscribe(() => {
        this.toastr.success(this.updateSuccessMsg);
      });
    this.closeModal();
  }

  closeModal() {
    this.isBusy = false;
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
