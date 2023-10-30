import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FlightComponent } from './form/fields/flight/flight.component';
import { MultiPathComponent } from './form/fields/multi-path/multi-path.component';
import { NumberPassengersComponent } from './form/fields/number-passengers/number-passengers.component';
import { PassengersComponent } from './form/fields/passengers/passengers.component';
import { TimeRangeComponent } from './form/fields/time-range/time-range.component';
import { PriceRangeComponent } from './form/fields/price-range/price-range.component';
import { ClassFlightComponent } from './form/fields/class-flight/class-flight.component';
const COMPONENTS = [
  FlightComponent,
  PassengersComponent,
  NumberPassengersComponent,
  MultiPathComponent,
  TimeRangeComponent,
  PriceRangeComponent,
  ClassFlightComponent,
];

@NgModule({
  declarations: [COMPONENTS, ClassFlightComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [COMPONENTS],
})
export class ElementsModule {}
