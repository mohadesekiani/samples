import { Directive, EventEmitter, Host, Injector, Input, Optional, Output } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { noop } from 'lodash-es';

@Directive()
export abstract class BaseControlValueAccessor<T>
  implements ControlValueAccessor {
  onChange = noop;
  onTouched = noop;
  disabled = false;
  touched: any;
  result!: any[];
  @Input() error = '';
  @Input() value!: T;
  @Output() valueChange = new EventEmitter();

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

  writeValue(obj: any): void {
    this.value = obj;
  }

  updateValueAndValidity(newValue: any): void {
    this.onChange(newValue);
    this.markAsTouched();
    this.valueChange.emit(newValue);
  }
}
