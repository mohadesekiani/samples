import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';

@NgModule({
  declarations: [LayoutComponent, ReactiveFormComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule, RouterModule],
})
export class LayoutModule {}
