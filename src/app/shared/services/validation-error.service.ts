import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  messages: { control: string, error: string, controller: AbstractControl }[] = [];
  // to
  messagesDic: { [key: string]: string } = {};


  getFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const controlErrors: any = form.get(key)?.errors;

      if (!controlErrors) {
        return;
      }

      Object.keys(controlErrors).forEach((keyError) => {
        const isDuplicate = this.messages.some(
          (item) => item.control === key && item.error === keyError
        );

        if (!isDuplicate) {
          this.messages.push({
            control: key,
            error: keyError,
            controller: form.get(key) as AbstractControl
          });
        }
      });
    });
  }
}
