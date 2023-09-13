import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-passengers',
  templateUrl: './number-passengers.component.html',
  styleUrls: ['./number-passengers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberPassengersComponent,
      multi: true,
    },
  ],
})
export class NumberPassengersComponent implements ControlValueAccessor {
  value: number = 0;
  onChange!: (value: number) => void;
  onTouch!: (value: number) => void;

  writeValue(obj: number): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
  increased() {
    this.value = this.value + 1;
    this.onChange(this.value);
    // this.onTouch(this.value);
  }
  decrees() {
    if (this.value <= 0) {
      return;
    }
    this.value = this.value - 1;
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  changeHandler(value: string) {
    this.value = +value;
    this.onChange(this.value);
    this.onTouch(this.value);
  }
}
