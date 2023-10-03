import { Host, Optional } from '@angular/core';
import { ControlContainer, ControlValueAccessor } from '@angular/forms';
import { noop } from 'lodash-es';

export abstract class BaseControlValueAccessor implements ControlValueAccessor {
  onChange = noop;
  onTouched = noop;
  abstract disabled: boolean;

  writeValue(obj: any): void {}

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
}
//TODO create for form
