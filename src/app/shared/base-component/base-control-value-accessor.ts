import { ControlValueAccessor } from '@angular/forms';

export class BaseControlValueAccessor implements ControlValueAccessor {
  onChange = (value: any) => {};
  onTouched = (value: any) => {};

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
