import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Host,
  Injector,
  Input,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import {
  AbstractControl,
  ControlContainer,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  _getOptionScrollPosition,
} from '@angular/material/core';
import { BaseInputControlValueAccessor } from 'src/app/shared/base-component/base-input-control-value-accessor';

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
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class DatepickerComponent extends BaseInputControlValueAccessor {
  @Input() formCtrl!: any;
  @Input() label!: string;
  @Input() min = new Date();
  @Input() max = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    //dd 'implements OnInit' to the class.
    // this.markAsTouched();
  }

  @Input() value!: Date;
  @Output() valueChange = new EventEmitter();
  disabled = false;
  touched = false;
  // @ViewChild('picker') picker!: MatDatepicker<any> ;

  dateValueChanged(value: Date) {
    // iran time zone offset is  210
    var d = new Date(value);
    let numericDate = d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    const date = new Date(numericDate);
    this.value = date;
    this.value = value;
    this.updateValue();
  }

  private updateValue() {
    this.updateValueAndTouch(this.value);
    this.valueChange.emit(this.value);
  }
}
