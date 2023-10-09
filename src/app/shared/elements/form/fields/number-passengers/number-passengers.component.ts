import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInput } from 'src/app/core/constance/base-component/base-input';
import { BaseInputControlValueAccessor } from 'src/app/core/constance/base-component/base-input-control-value-accessor';

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
export class NumberPassengersComponent extends BaseInput<number> {
  override value: number = 0;


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
    this.markAsTouched();
  }

  changeHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.value = +value;
    
    this.updateValueAndValidity(this.value);
  }
}
