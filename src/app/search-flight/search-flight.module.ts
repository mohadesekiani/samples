import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFlightRoutingModule } from './search-flight-routing.module';
import { SearchFlightComponent } from './search-flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchFlightComponent],
  imports: [
    CommonModule,
    SearchFlightRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
})
export class SearchFlightModule {}
