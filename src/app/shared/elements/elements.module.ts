import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DatepickerComponent } from './components/form/datepicker/datepicker.component';
//import { FlightComponent } from './components/form/flight/flight.component';
import { PasengersComponent } from './form/fields/pasengers/pasengers.component';
import { SharedModule } from '../shared.module';
import { MaterialModule } from '../material/material.module';
import { DatepickerComponent } from './form/fields/datepicker/datepicker.component';
import { FlightComponent } from './form/fields/flight/flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralComponent } from './form/fields/general/general.component';
const COMPONENTS = [
  DatepickerComponent,
  FlightComponent,
  PasengersComponent,
  GeneralComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // SharedModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [COMPONENTS],
})
export class ElementsModule {}
