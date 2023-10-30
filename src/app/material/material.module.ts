import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import {
  MatFormField,
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

const appearanceOutlineOptions = {
  appearance: 'outline',
};
const components = [DatepickerComponent];
const modules = [
  MatCardModule,
  MatListModule,
  MatSliderModule,
  MatRadioModule,
  MatInputModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatIconModule,
  MatMenuModule,
  NativeDateModule,
  MatExpansionModule,
  MatCheckboxModule,
];

@NgModule({
  imports: [CommonModule, ...modules],
  declarations: [...components],
  exports: [...modules, ...components],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearanceOutlineOptions,
    },
  ],
})
export class MaterialModule {}
