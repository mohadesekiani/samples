import { Directive } from '@angular/core';
import { BaseControlValueAccessor } from './base-control-value-accessor';

@Directive()
export abstract class BaseInputControlValueAccessor<T> extends BaseControlValueAccessor<T> {
  // ngControl: NgControl | undefined;

  // constructor(private baseInj: Injector) {
  //   super();
  // }

  override writeValue(obj: any): void {
    this.value = obj;
  }

  updateValueAndValidity(newValue: any): void {
    this.onChange(newValue);
    this.markAsTouched();
  }
}
