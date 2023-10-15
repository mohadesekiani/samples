import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  messages: { [key: string]: string } = {};

  process(
    form: FormGroup | FormArray,
    parentControlKey: string = ''
  ): { [key: string]: string } {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      const controlKey = parentControlKey ? `${parentControlKey}.${key}` : key;

      if (control instanceof FormArray) {
        control.controls.forEach((arrayControl, index) =>
          this.process(
            arrayControl as FormGroup,
            `${controlKey}[${index}]`
          )
        );

        return;
      }

      if (control instanceof FormGroup) {
        this.process(control, controlKey);

        return;
      }

      const controlErrors: any = form.get(key)?.errors;

      if (!controlErrors) {
        return;
      }

      Object.keys(controlErrors).forEach((keyError) => {
        const errorMessage = this.getErrorMessage(key, keyError);
        this.messages[controlKey] = errorMessage;
      });
    });

    return this.messages;
  }

  private getErrorMessage(control: string, error: string): string {
    switch (error) {
      case 'required':
        return `The field "${control}" is mandatory.`;
      case 'dateInvalid':
        return `The selected date for "${control}" is not allowed.`;
      case 'returnDateInvalid':
        return `The selected date for "${control}" cannot be smaller than the original date.`;
      case 'max':
        return `The number of "${control}" cannot be more than adults.`;
      default:
        return `Validation error for "${control}".`;
    }
  }
}
