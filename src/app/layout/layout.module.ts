import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFlightModule } from '../search-flight/search-flight.module';

@NgModule({
  declarations: [LayoutComponent,],
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
