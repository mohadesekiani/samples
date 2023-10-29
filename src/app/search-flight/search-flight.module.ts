import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFlightRoutingModule } from './search-flight-routing.module';
import { SearchFlightComponent } from './search-flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ListFlightComponent } from './elements/fields/list-flight/list-flight.component';
import { FilterFlightComponent } from './elements/fields/filter-flight/filter-flight.component';
import { ResultFlightComponent } from './page/result-flight/result-flight.component';
import { FormatTimePipe } from './pipe/format-time.pipe';

@NgModule({
  declarations: [
    SearchFlightComponent,
    ListFlightComponent,
    FilterFlightComponent,
    ResultFlightComponent,
    FormatTimePipe,
  ],
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
