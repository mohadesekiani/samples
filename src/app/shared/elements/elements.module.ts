import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FlightComponent } from './form/fields/flight/flight.component';
import { MultiPathComponent } from './form/fields/multi-path/multi-path.component';
import { NumberPassengersComponent } from './form/fields/number-passengers/number-passengers.component';
import { PassengersComponent } from './form/fields/passengers/passengers.component';
import { TimeRangeComponent } from './form/fields/time-range/time-range.component';
const COMPONENTS = [
  FlightComponent,
  PassengersComponent,
  NumberPassengersComponent,
  MultiPathComponent,
  TimeRangeComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [COMPONENTS],
})
export class ElementsModule {}
