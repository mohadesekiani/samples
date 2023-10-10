import { Component, Injector } from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';
import { BaseInputControlValueAccessor } from './base-input-control-value-accessor';

@Component({
  selector: '',
  template: '',
})
export abstract class BaseInput<T> extends BaseInputControlValueAccessor<T> {

  constructor() {
    super();
  }
  ngOnInit() {
  }

  get errorMessage() {
    // let errors = this.ngControl?.errors;
    // if (!errors) {
    //   return '';
    // }
    // let errorMessages: any = [];
    // Object.keys(errors).forEach((key) => {
    //   switch (key) {
    //     case 'required':
    //       errorMessages.push(`This field is mandatory.`);
    //       break;
    //     case 'dateInvalid':
    //       errorMessages.push(`The selected date is not allowed.`);
    //       break;
    //     case 'returnDateInvalid':
    //       errorMessages.push(
    //         `The selected date cannot be smaller than the original date.`
    //       );
    //       break;
    //     case 'max':
    //       errorMessages.push(
    //         `The number of infant cannot be more than adults.`
    //       );
    //       break;
    //   }
    // });
    // return errorMessages.join(',') ?? '';
    return '';
  }

}
