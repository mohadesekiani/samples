import { ListService, CoreModule, PagedResultDto } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  NgbDateAdapter,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { PageModule } from '@abp/ng.components/page';
import { TreeNode } from 'primeng/api';

import { BusinessRoleListsViewService } from '../services/business-role-lists.service';
import { AbstractBusinessRoleListsComponent } from './business-role-lists.abstract.component';
import { AccessPatternDto } from '@proxy/access-patterns';
import { TreeModule } from 'primeng/tree';
import { RolesRegisterService } from '@proxy/role-register/roles';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-business-role-lists',
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
    TreeModule,

    PageModule,
  ],
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './business-role-lists.component.html',
  styleUrls: ['./business-role-lists.component.scss'],
})
export class BusinessRoleListsComponent
  extends AbstractBusinessRoleListsComponent
  implements OnInit, OnDestroy
{
  protected readonly RolesRegisterService = inject(RolesRegisterService);
  protected readonly BusinessRoleListsService = inject(BusinessRoleListsViewService);

  isBusy = false;
  isVisible = false;
  destroyed = new Subject();

  data: PagedResultDto<AccessPatternDto> = {
    items: [],
    totalCount: 0,
  };
  rootNodes = [];

  closeModal() {
    this.isBusy = false;
    this.isVisible = false;
    // this.form.reset();
  }

  menuTree = [];
  selectedNodes = [];

  ngOnInit(): void {
    this.RolesRegisterService.getBusinessRoles()
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        this.data = res;

        this.menuTree = this.buildTree(this.data.items);
      });

    this.BusinessRoleListsService.isVisibleSubject
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        this.isVisible = res;
      });
  }

  private buildTree(data) {
    data.forEach(item => {
      const node = {
        ...item,
        label: item.title,
        children: [],
      };

      this.rootNodes.push(node);
    });

    return this.rootNodes;
  }

  saveSelectedItems() {}

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
