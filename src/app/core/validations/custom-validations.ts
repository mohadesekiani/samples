import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IPassengerTypes } from 'src/app/models/passenger-types.interface';

export class CustomValidations {
  static childrenCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passengers: IPassengerTypes = control.value;
      if (passengers?.Infant > passengers?.Adult) {
        return { max: { actual: passengers.Infant, max: passengers.Adult } };
      }
      return null;
    };
  }
}
