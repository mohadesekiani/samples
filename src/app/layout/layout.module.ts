import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFlightComponent } from '../search-flight/search-flight.component';
import { SearchFlightModule } from '../search-flight/search-flight.module';

@NgModule({
  declarations: [LayoutComponent, ReactiveFormComponent],
  imports: [
    LayoutRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SearchFlightModule
  ],
})
export class LayoutModule {}
