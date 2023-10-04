import { Host, Optional } from '@angular/core';
import { ControlContainer, ControlValueAccessor } from '@angular/forms';
import { noop } from 'lodash-es';

export abstract class BaseControlValueAccessor<T> implements ControlValueAccessor {
  value!: T;
  onChange = noop;
  onTouched = noop;
  disabled = false;
  touched: any;

  writeValue(obj: any): void {  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    //in touched ro hal kon
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
//TODO create for form
