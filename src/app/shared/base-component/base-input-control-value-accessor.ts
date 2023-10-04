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

  constructor(private inj: Injector, public dataService: AbstractDataService) {
    super();
  }

  ngAfterViewInit() {
    this.ngControl = this.inj.get(NgControl);
  }

  get errorMessage() {
    let errors = this.ngControl?.errors;
    // return errors;
    if (errors) {
      let errorMessages: any = [];
      console.log('hi');
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
      return errorMessages[0] ?? null;
    } else return null;
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
