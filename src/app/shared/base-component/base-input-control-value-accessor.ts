import { BaseControlValueAccessor } from './base-control-value-accessor';

export abstract class BaseInputControlValueAccessor extends BaseControlValueAccessor {
  abstract value: any;
  abstract touched:boolean;
  override writeValue(obj: any): void {
    this.value = obj;
  }

  markAsTouched() {
    if (this.touched) {
      return;
    }
    this.onTouched();
    this.touched = true;
  }

  updateValueAndTouch(newValue: any): void {
    this.onChange(newValue);
    this.markAsTouched();
  }

}
