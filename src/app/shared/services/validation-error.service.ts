import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  private result: any[] = [];

  getFormValidationErrors(form: FormGroup): ValidationErrors | null {
    Object.keys(form.controls).forEach((key) => {
      const controlErrors: any = form.get(key)?.errors;

      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          this.result.push({
            control: key,
            error: keyError,
            value: controlErrors[keyError],
          });
        });
      }
    });
    console.log(this.result);

    return this.result;
  }
}
