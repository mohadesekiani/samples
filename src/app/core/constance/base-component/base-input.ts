import { Component, Injector } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';
import { BaseInputControlValueAccessor } from './base-input-control-value-accessor';

@Component({
  selector: '',
  template: '',
})
export abstract class BaseInput<T> extends BaseInputControlValueAccessor<T> {
  ngControl: NgControl | undefined;

  constructor(private baseInj: Injector) {
    super();
  }
  ngOnInit() {
    this.ngControl = this.baseInj.get(NgControl);
    console.log(this.ngControl);
    
  }

  get errorMessage() {
    let errors = this.ngControl?.errors;
    if (errors) {
      let errorMessages: any = [];
      Object.keys(errors).forEach((key) => {
        switch (key) {
          case 'required':
            errorMessages.push(`This field is mandatory.`);
            break;
          case 'dateInvalid':
            errorMessages.push(`The selected date is not allowed.`);
            break;
          case 'returnDateInvalid':
            errorMessages.push(
              `The selected date cannot be smaller than the original date.`
            );
            break;
          case 'max':
            errorMessages.push(
              `The number of infant cannot be more than adults.`
            );
            break;
        }
      });
      return errorMessages[0] ?? '';
    } else return;
  }
  get formCtrl() {
    let ctrl = this.ngControl?.name;    
    if (this.ngControl) {
      console.log(ctrl);
      
      return ctrl;
    } else return;
  }
}
