import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { IPassengerTypes } from 'src/app/models/passenger-types.interface';

export class PassengerValidations {
  static childrenCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var fg = control?.parent as FormGroup;
      if (!fg) {
        return null;
      }
      // let infantValue = fg.value?.Infant;
      let infantValue = control.value;
      let adultValue = fg.value?.Adult;
      console.log('infantValue', infantValue);
      console.log('adultValue', adultValue);
      if (+infantValue > +adultValue) {
        return { max: { actual: infantValue, max: adultValue } };
        return { max: true };
      }

      return null;
    };
  }
}
