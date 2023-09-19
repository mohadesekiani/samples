import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DatepickerComponent } from './components/form/datepicker/datepicker.component';
//import { FlightComponent } from './components/form/flight/flight.component';
import { PassengersComponent } from './form/fields/passengers/passengers.component';
//import { SharedModule } from '../shared.module';
import { MaterialModule } from '../material/material.module';
import { DatepickerComponent } from './form/fields/datepicker/datepicker.component';
import { FlightComponent } from './form/fields/flight/flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';
import { NumberPassengersComponent } from './form/fields/number-passengers/number-passengers.component';
import { MultiPathsComponent } from './form/fields/multi-paths/multi-paths.component';
import { ButtonToggleComponent } from './form/fields/button-toggle/button-toggle.component';
const COMPONENTS = [
  DatepickerComponent,
  FlightComponent,
  PassengersComponent,
  NumberPassengersComponent,
  MultiPathsComponent,
  ButtonToggleComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // SharedModule,
    // BrowserModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [COMPONENTS],
})
export class ElementsModule {}
