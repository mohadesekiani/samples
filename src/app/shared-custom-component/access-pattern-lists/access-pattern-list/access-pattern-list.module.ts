import { NgModule } from '@angular/core';
import { AccessPatternListComponent } from './components/access-pattern-list.component';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [],
  imports: [AccessPatternListComponent, TreeModule],
  exports: [AccessPatternListComponent],
})
export class AccessPatternListModule {}
