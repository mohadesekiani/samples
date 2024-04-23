import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MenuApiAndStateManagemnetService } from '@proxy/menu-api-and-state-management/menu-api-and-state-managemnet.service';
import { HelperService } from '../../../proxy/helper/helper.service';
import { Subject, takeUntil } from 'rxjs';
import { UserBusinessHelperService } from '@proxy/user-businesses/user-businesses-helper/user-business-helper.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriesStateService } from 'src/app/state/categories-state';
import { MyAccountService } from '@proxy/core/my-account';

@Component({
  selector: 'app-popover-h',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './drop-down-roles-m.component.html',
})
export class DropDownRolesHComponent implements OnInit, OnDestroy {
  selectedBusinessRoleInfo;
  destroyed = new Subject();
  confirmedUserBusiness;
  constructor(
    private menuApiStateService: MenuApiAndStateManagemnetService,
    private helperService: HelperService,
    private userBusinessHelperService: UserBusinessHelperService,
    private router: Router,
    private catStateService: CategoriesStateService,
    private myAccService: MyAccountService
  ) {}
  ngOnInit(): void {
    this.catStateService.notAllowedUrl.pipe(takeUntil(this.destroyed)).subscribe({
      next: res => {
        console.log(res, 'res');
        if (res.trim() === '/home-content') {
          console.log(res.trim(), 'res.trim()');
        } else {
          console.log(1);
          this.fillDropDownRoles();
        }
      },
    });
    this.userBusinessHelperService.confiredUserBusinessSub
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        this.confirmedUserBusiness = res;
      });
    const selectedBusinessRole = this.helperService.getFromLocalStorage('selectedBusinessRole');
    this.selectedBusinessRoleInfo = selectedBusinessRole ? selectedBusinessRole : '';
    this.menuApiStateService.selectedBusinessRoleInfo
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        this.selectedBusinessRoleInfo = res;
      });
  }

  fillDropDownRoles() {
    //confirmed businessRoles
    return this.myAccService
      .getMyBusinessesList()
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        let confirmedList = [];
        let pendingList = [];
        res.forEach(item => {
          if (item.isConfirmed && item.deActiveByClient !== true && item.deActiveByAdmin !== true) {
            confirmedList.push(item);
          } else if (item.deActiveByClient === true) {
            pendingList.push(item);
          }
        });

        this.userBusinessHelperService.confiredUserBusinessSub.next(confirmedList);
      });
  }

  onTempMenuChange(item) {
    this.helperService.setToLocalStorage('selectedBusinessRole', item);
    this.menuApiStateService.isCardSelected.next(true);
    this.helperService.setToLocalStorage('isCardSelected', true);
    this.helperService.setMenuConfigurations(item);
    this.menuApiStateService.selectedBusinessRoleInfo.next(item);
    this.router.navigate(['/home']);
  }

  onRemoveselectedBusinessRole() {
    this.menuApiStateService.isCardSelected.next(false);
    this.helperService.removeFromLocalStorage('isCardSelected');
    this.helperService.removeFromLocalStorage('selectedBusinessRole');
    this.menuApiStateService.selectedBusinessRoleInfo.next({});
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
