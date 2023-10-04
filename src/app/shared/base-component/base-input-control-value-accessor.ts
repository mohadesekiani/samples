import { Component, Injector } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { BaseControlValueAccessor } from './base-control-value-accessor';

@Component({
  selector: '',
  template: '',
})
export abstract class BaseInputControlValueAccessor extends BaseControlValueAccessor {
  ngControl: NgControl | undefined;

  constructor(private baseInj: Injector) {
    super();
  }
  ngOnInit() {
    this.ngControl = this.baseInj.get(NgControl);
  }

  // ngAfterViewInit() {
  //   this.ngControl = this.baseInj.get(NgControl);
  // }

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

  abstract value: any;
  abstract touched: boolean;
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
