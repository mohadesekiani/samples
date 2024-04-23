import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoleListsComponent } from './components/business-role-lists.component';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [],
  imports: [CommonModule, BusinessRoleListsComponent, TreeModule],
  exports: [BusinessRoleListsComponent],
})
export class BusinessRoleListsModule {}
