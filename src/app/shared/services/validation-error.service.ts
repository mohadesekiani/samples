import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  messages: { control: string; error: string; controller: AbstractControl }[] =
    [];
  // to
  messagesDic: { [key: string]: string } = {};

  getFormValidationErrors(form: FormGroup): { [key: string]: string } {
    Object.keys(form.controls).forEach((key) => {

      if ((form.get(key) instanceof FormArray)) {
        debugger
        // this.getFormValidationErrors(form.get(key))
        return;
      }

      if ((form.get(key) instanceof FormGroup)) {

        return;
      }

      const controlErrors: any = form.get(key)?.errors;

      if (!controlErrors) {
        return;
      }

      Object.keys(controlErrors).forEach((keyError) => {
        const errorMessage = this.getErrorMessage(key, keyError);
        this.messagesDic[key] = errorMessage;
      });
    });

    return this.messagesDic;
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
