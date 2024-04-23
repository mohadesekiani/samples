import { ListService, CoreModule } from '@abp/ng.core';
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

import { AccessPatternListViewService } from '../services/access-pattern-list.service';
import { AbstractAccessPatternListComponent } from './access-pattern-list.abstract.component';
import { AccessPatternDto, AccessPatternService } from '@proxy/access-patterns';
import { TreeModule } from 'primeng/tree';
import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest, forkJoin, map, mergeMap, take, takeUntil } from 'rxjs';
import { Mode } from 'src/app/shared/product-lists/product-list/services/product-list.service';

@Component({
  selector: 'app-access-pattern-list',
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
  templateUrl: './access-pattern-list.component.html',
  styleUrls: ['./access-pattern-list.component.scss'],
})
export class AccessPatternListComponent
  extends AbstractAccessPatternListComponent
  implements OnInit, OnDestroy
{
  protected readonly proxyService = inject(AccessPatternService);
  protected readonly AcPatService = inject(AccessPatternListViewService);
  protected readonly route = inject(ActivatedRoute);

  isBusy = false;
  isVisible = false;
  processId;
  isFiltered: boolean = false;
  destroyed = new Subject();

  data;
  // rootNodes = [];

  menuTree = [];
  selectedNodes = [];

  mode: Mode = 'create';

  ngOnInit(): void {
    this.dataInit();
    console.log(this.menuTree);

    this.AcPatService.isVisibleSubject.pipe(takeUntil(this.destroyed)).subscribe(res => {
      this.isVisible = res;
    });

    this.AcPatService.isFilteredSubject.pipe(takeUntil(this.destroyed)).subscribe(res => {
      this.isFiltered = res;
      this.isVisible = res;
    });
    this.AcPatService.mode$.pipe(takeUntil(this.destroyed)).subscribe(mode => {
      this.mode = mode;
      if (mode === 'show') {
        this.dataInit();
      } else if (mode === 'create') {
        this.isFiltered = false;
        this.dataInit();
      } else if (mode === 'update') {
        const pid = this.route.snapshot.queryParams.pid;
        const obs1 = this.proxyService.getAccessPatternsListById(pid, { maxResultCount: null });
        const obs2 = this.proxyService.getSelectedAccessPatternListByProceedingId(pid, {
          maxResultCount: null,
        });

        forkJoin([obs1, obs2])
          .pipe(takeUntil(this.destroyed))
          .subscribe(([allAccessPatternList, selectedRes]) => {
            console.log('all: ', allAccessPatternList);
            console.log('selected: ', selectedRes);
            // compare
            allAccessPatternList.forEach(accessPattern => {
              // Find the matching item in selectedRes by path
              const matchedItem = selectedRes.find(item => item.path === accessPattern.path);
              if (matchedItem) {
                // If a matching item is found, set isActive to true in allAccessPatternList
                accessPattern.isActive = true;
              }
            });
          });
      }
    });
  }

  onNodeSelect(event) {
    console.log(event.node);
  }

  dataInit() {
    const pid = this.route.snapshot.queryParams.pid;
    if (this.isFiltered == false) {
      this.proxyService
        .getAccessPatternsListById(pid, { maxResultCount: null })
        .pipe(takeUntil(this.destroyed))
        .subscribe(res => {
          this.data = res;
          this.menuTree = this.buildTree(this.data);
        });
    }

    if (this.isFiltered == true) {
      this.proxyService
        .getSelectedAccessPatternListByProceedingId(pid, { maxResultCount: null })
        .pipe(takeUntil(this.destroyed))
        .subscribe(res => {
          this.data = res;
          this.menuTree = this.buildTree(this.data);
        });
    }
  }
  private buildTree(accessPatterns: AccessPatternDto[]) {
    let rootNodes = [];
    accessPatterns.forEach(item => {
      const node = {
        ...item,
        label: item.name,
        children: [],
      };

      if (!item.parentName) {
        rootNodes.push(node);
      }
    });

    rootNodes = this.setChildren(rootNodes);

    return rootNodes;
  }

  saveSelectedItems() {
    this.AcPatService.selectedNodes = this.selectedNodes;
    this.isVisible = false;
  }

  setChildren(rootNodes) {
    this.data
      .filter(f => {
        return f.parentName !== null;
      })
      .forEach(ite => {
        rootNodes.forEach(res => {
          if (res.label.trim() === ite.parentName.trim()) {
            res.children.push({ label: ite.name, id: ite.id });
          }
        });
      });

    return rootNodes;
  }

  closeModal() {
    this.isBusy = false;
    this.isVisible = false;
    this.isFiltered = false;
    this.proxyService.selectedAccessPatternRow = null;
  }

  getSelectedNodes(): AccessPatternDto[] {
    return this.selectedNodes;
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
