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
import { IncreaseButtonComponent } from './tools/increase-button/increase-button.component';
const COMPONENTS = [
  DatepickerComponent,
  FlightComponent,
  PassengersComponent,
];

@NgModule({
  declarations: [COMPONENTS, IncreaseButtonComponent],
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
