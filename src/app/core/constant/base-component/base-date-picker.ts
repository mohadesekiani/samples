import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { BaseInputControlValueAccessor } from './base-input-control-value-accessor';

@Directive()
export abstract class BaseDatepickerComponent extends BaseInputControlValueAccessor<Date> {
  
  @Input() min = new Date();
  @Input() max = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  @Input() validationErrorMessage!: any;
  dateValueChanged(value: Date): void {
    // iran time zone offset is  210
    // var d = new Date(value);
    // let numericDate = d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    // const date = new Date(numericDate);
    // this.value = date;
    this.value = value;
    this.updateValue();
  }
}
