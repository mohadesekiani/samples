import { Directive, Host, Injector, Input, Optional } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { noop } from 'lodash-es';

@Directive()
export abstract class BaseControlValueAccessor<T>
  implements ControlValueAccessor
{
  value!: T;
  onChange = noop;
  onTouched = noop;
  disabled = false;
  touched: any;
  result!: any[];
  @Input() abstract validationErrorMessage: any;

  writeValue(obj: any): void {}

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
    this.messageError('departureDate');
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  messageError(controlName: string) {
    this.result = this.validationErrorMessage.filter(
      (item: any) => item.control === controlName
    );
    console.log(this.result);
    console.log(this.validationErrorMessage);

    return this.result;
  }
}
//TODO create for form
