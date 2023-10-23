import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersComponent } from './form/fields/passengers/passengers.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlightComponent } from './form/fields/flight/flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberPassengersComponent } from './form/fields/number-passengers/number-passengers.component';
import { MultiPathComponent } from './form/fields/multi-path/multi-path.component';
import { ErrorMessagePipe } from '../pips/error-message.pipe';
const COMPONENTS = [
  FlightComponent,
  PassengersComponent,
  NumberPassengersComponent,
  MultiPathComponent,
  ErrorMessagePipe
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [COMPONENTS],
})
export class ElementsModule {}
