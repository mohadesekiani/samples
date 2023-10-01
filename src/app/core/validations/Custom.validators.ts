import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { IForm, ISearchRoute } from 'src/app/models/search-types.interface';
import * as moment from 'moment';

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

  static dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const selectedDate = control.value;
      if (selectedDate) {
        var time1 = moment(selectedDate).format('YYYY-MM-DD');
        var time2 = moment(currentDate).format('YYYY-MM-DD');
        console.log(time1,time2);
        if ( time1 < time2) return { dateInvalid: true };
      }

      return null;
    };
  }

  static returnDateValidator(nameArray: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control.root.get(nameArray) as FormArray<
        FormGroup<IForm<ISearchRoute>>
      >;
      const departureDate = formArray.at(0).controls.departureDate.value;
      const returnDate = control.value;
      if (departureDate && returnDate) {
        var time1 = moment(departureDate).format('YYYY-MM-DD');
        var time2 = moment(returnDate).format('YYYY-MM-DD');
        if (time2 < time1) return { returnDateInvalid: true };
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
      if (+infantValue > +adultValue) {
        return { max: { actual: infantValue, max: adultValue } };
      }

      return null;
    };
  }
}
