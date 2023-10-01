import { ControlValueAccessor } from '@angular/forms';
import { noop } from 'lodash-es';

export class BaseControlValueAccessor implements ControlValueAccessor {
  onChange = noop;
  onTouched = noop;

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }
}
//TODO create for form
