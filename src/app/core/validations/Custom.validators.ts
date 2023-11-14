import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { IForm, ISearchRoute } from 'src/app/core/module/interface/search-types.interface'


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

  static minDateToday(fromField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      if (!formGroup) {
        return null;
      }
      const today = new Date();
      const selectedCtrl = formGroup.get(fromField)
      const time1 = new Date(selectedCtrl.value)
      if (time1.getTime() < today.getTime()) {
        selectedCtrl.setErrors({ today: { minDateToday: true, actualValue: time1, expected: today } });
      }

      return null;
    };
  }

  static maxDateTo(fromField: string, toField: string, maxDate?: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      if (!formGroup) {
        return null;
      }
      const fromDateCtrl = formGroup.get(fromField);
      const toDateCtrl = formGroup.get(toField);

      if (!fromDateCtrl || !toDateCtrl) {
        return null;
      }

      const time1 = new Date(fromDateCtrl.value);
      const time2 = new Date(toDateCtrl.value);
      // const oneMonthLater = new Date();
      // const x = oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      // if (time2.getTime() > x) {
      //   toDateCtrl?.setErrors({ max: { actual: toDateCtrl.value, max: new Date().getMonth() + 1 } });
      // }
      if (time2.getTime() < time1.getTime()) {
        toDateCtrl?.setErrors({ min: { actual: toDateCtrl.value, min: fromDateCtrl?.value } });
      }

      return null;
    }
  }

  static minDateTo(fromField: string, toField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      if (!formGroup) {
        return null;
      }
      const fromDateCtrl = formGroup.get(fromField);
      const toDateCtrl = formGroup.get(toField);

      if (fromDateCtrl && toDateCtrl) {
        const time1 = new Date(fromDateCtrl.value)
        const time2 = new Date(toDateCtrl.value)
        if (time2.getTime() < time1.getTime()) {
          toDateCtrl?.setErrors({ min: { actual: toDateCtrl.value, min: fromDateCtrl?.value } });
        };

      }

      return null;

    }
  }




}
