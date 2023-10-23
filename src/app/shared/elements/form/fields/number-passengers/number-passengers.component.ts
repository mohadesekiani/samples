import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputControlValueAccessor } from 'src/app/core/constant/base-component/base-input-control-value-accessor';

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
export class NumberPassengersComponent extends BaseInputControlValueAccessor<number> {
  override value: number = 0;
  @Input() validationErrorMessage!: any;


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
