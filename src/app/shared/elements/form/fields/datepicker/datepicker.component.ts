import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { BaseControlValueAccessor } from 'src/app/shared/base-component/base-control-value-accessor';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// export const PICK_FORMATS = {
//   parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
//   display: {
//     dateInput: 'input',
//     monthYearLabel: { year: 'numeric', month: 'short' },
//     dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
//     monthYearA11yLabel: { year: 'numeric', month: 'long' },
//   },
// };

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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class DatepickerComponent extends BaseControlValueAccessor {
  @Input() label!: string;
  @Input() min = new Date();
  @Input() max = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );

  @Input() value!: Date;
  @Output() valueChange = new EventEmitter();
  disabled = false;
  touched = false;
  // @ViewChild('picker') picker!: MatDatepicker<any> ;

  override writeValue(obj: any): void {
    this.value = obj;
  }

  override setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (this.touched) {
      return;
    }

    this.onTouched();
    this.touched = true;
  }

  dateValueChanged(value: Date) {
    // var d = new Date(value);
    // let numericDate = d.setMinutes(d.getMinutes() + 210);
    // const date = new Date(numericDate);
    // this.value = date;

    this.value = value;
    this.updateValue();
  }

  private updateValue() {
    this.onChange(this.value);
    this.markAsTouched();
    this.valueChange.emit(this.value);
  }
}
