import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static maxFrom(fromField: string, toField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;

      if (!formGroup) {
        return null;
      }

      const fromFieldCtrl = formGroup.get(fromField);
      const toFieldCtrl = formGroup.get(toField);

      if (fromFieldCtrl?.value > toFieldCtrl?.value) {
        fromFieldCtrl?.setErrors({
          max: { actual: fromFieldCtrl.value, max: toFieldCtrl?.value },
        });

        return null;
      }

      if (fromFieldCtrl?.hasError('max')) {
        // fromFieldCtrl?.setErrors({ max: null });
        fromFieldCtrl?.updateValueAndValidity({ onlySelf: true });
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
