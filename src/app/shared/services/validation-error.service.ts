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
          const isDuplicate = this.result.some(
            (item) => item.control === key && item.error === keyError
          );

          if (!isDuplicate) {
            this.result.push({
              control: key,
              error: keyError,
              controller: form.get(key)
            });
          }
        });
      }
    });

    return this.result;
  }
}
