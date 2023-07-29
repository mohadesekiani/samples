import { Component, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  // ########################################################
  //              control value accessor scope              #
  // ########################################################
  value: any = '';

  disabled = false;
  touched = false;
  onChange = (value) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  // ########################################################

  @Input() label;
  set(value) {
    if (!this.disabled) {
      this.value = value;
      this.onChange(this.value);
      this.markAsTouched();
    }
  }
  dateValueChanged(value) {
    this.value = value;
    this.onChange(this.value);
    this.markAsTouched();
  }
  // date: Array<any> = [
  //   { title: 'Departure Date', selectedDate: null },
  //   { title: 'Return Date', selectedDate: null },
  // ];
  // logDate(item: any) {
  //   console.log(item.title + ':', item.selectedDate);
  // }
}
