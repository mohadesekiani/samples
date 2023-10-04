import { Component, Injector } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { BaseControlValueAccessor } from './base-control-value-accessor';

@Component({
  selector: '',
  template: '',
})
export abstract class BaseInputControlValueAccessor<
  T
> extends BaseControlValueAccessor<T> {
  ngControl: NgControl | undefined;

  constructor(private baseInj: Injector) {
    super();
  }
  ngOnInit() {
        // this.ngControl = this.baseInj.get(NgControl);

  }

  //TODO move me to base form
  //common in base form control value accessor and base form component
  get errorMessage() {
    let errors = this.ngControl?.errors;
    if (errors) {
      let errorMessages: any = [];
      Object.keys(errors).forEach((key) => {
        switch (key) {
          case 'required':
            errorMessages.push(`you must enter Date.`);
            break;
          case 'dateInvalid':
            errorMessages.push(`The selected date is not allowed.`);
            break;
        }
      });
      return errorMessages[0] ?? '';
    } else return '';
  }

  override writeValue(obj: any): void {
    this.value = obj;
  }

  updateValueAndValidity(newValue: any): void {
    this.onChange(newValue);
    this.markAsTouched();
  }
}
