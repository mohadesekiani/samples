import { FormBuilder, NgControl } from '@angular/forms';
import { BaseFormControlValueAccessor } from './base-form-control-value-accessor';
import { Directive, Injector } from '@angular/core';

@Directive()
export abstract class BaseForm<T> extends BaseFormControlValueAccessor<T> {
  ngControl: NgControl | undefined;

  constructor(fb: FormBuilder,protected baseInj: Injector) {
    super(fb);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.ngControl = this.baseInj.get(NgControl);
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
    let ctrl = this.ngControl;
    if (ctrl) {
      return ctrl;
    } else return;
  }
}
