import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersComponent } from './form/fields/passengers/passengers.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DatepickerComponent } from './form/fields/datepicker/datepicker.component';
import { FlightComponent } from './form/fields/flight/flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberPassengersComponent } from './form/fields/number-passengers/number-passengers.component';
import { MultiPathComponent } from './form/fields/multi-path/multi-path.component';
const COMPONENTS = [
  DatepickerComponent,
  FlightComponent,
  PassengersComponent,
  NumberPassengersComponent,
  MultiPathComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [COMPONENTS],
})
export class ElementsModule {}
