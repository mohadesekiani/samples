import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from 'src/app/shared/base-component/base-control-value-accessor';

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
export class NumberPassengersComponent extends BaseControlValueAccessor {
  value: number = 0;
  override writeValue(obj: number): void {
    this.value = obj;
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
    this.onTouched(this.value);
  }

  changeHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.value = +value;
    this.onChange(this.value);
    this.onTouched(this.value);
  }
}
