import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import {
  ErrorStateMatcher,
  MAT_DATE_FORMATS,
  _getOptionScrollPosition,
} from '@angular/material/core';
import { BaseInputControlValueAccessor } from 'src/app/shared/base-component/base-input-control-value-accessor';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     return true
//   }
// }
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatepickerComponent,
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class DatepickerComponent extends BaseInputControlValueAccessor<Date> {
  @Input() label!: string;
  @Input() min = new Date();
  @Input() max = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );

  @Output() valueChange = new EventEmitter();
  // matcher = new MyErrorStateMatcher();

  dateValueChanged(value: Date) {
    // iran time zone offset is  210
    // var d = new Date(value);
    // let numericDate = d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    // const date = new Date(numericDate);
    // this.value = date;
    this.value = value;
    this.updateValue();
  }

  private updateValue() {
    this.updateValueAndValidity(this.value);
    this.valueChange.emit(this.value);
  }
}
