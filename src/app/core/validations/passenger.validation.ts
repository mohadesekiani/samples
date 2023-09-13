import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class PassengerValidations {
  static maxFrom(fromField: string, maxField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fg = control?.parent as FormGroup;
      if (!fg) {
        return null;
      }
      let fromFieldValue = control.value;
      let maxFieldValue = fg.value[maxField];
      console.log('infantValue', fromFieldValue);
      console.log('adultValue', maxFieldValue);
      if (+fromFieldValue > +maxFieldValue) {
        return { max: { actual: fromFieldValue, max: maxFieldValue } };
      }

      return null;
    };
  }

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
      }

      return null;
    };
  }
}
