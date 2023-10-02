import { ControlValueAccessor } from '@angular/forms';
import { noop } from 'lodash-es';

export abstract class BaseControlValueAccessor implements ControlValueAccessor {
  onChange = noop;
  onTouched = noop;
  abstract value: any;
  abstract disabled: boolean;

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
//TODO create for form
