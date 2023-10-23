import { Directive, Host, Injector, Input, Optional } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { noop } from 'lodash-es';

@Directive()
export abstract class BaseControlValueAccessor<T>
  implements ControlValueAccessor {
  value!: T;
  onChange = noop;
  onTouched = noop;
  disabled = false;
  touched: any;
  result!: any[];
  @Input() error = '';

  writeValue(obj: any): void { }

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
}
