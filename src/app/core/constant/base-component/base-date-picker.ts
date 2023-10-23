import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { BaseInputControlValueAccessor } from './base-input-control-value-accessor';

@Directive()
export abstract class BaseDatepickerComponent extends BaseInputControlValueAccessor<Date> {
  @Input() label!: string;
  @Input() name!: string;
  @Input() min = new Date();
  @Input() max = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  @Input() validationErrorMessage!: any;
  @Output() valueChange = new EventEmitter();
  dateValueChanged(value: Date): void {
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
    // super.messageError(this.name);
    this.valueChange.emit(this.value);
  }
}
