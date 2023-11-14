import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { get } from 'lodash-es';



export class CustomValidators {


  static maxFrom(fromField: string, toField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;

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

  static unique(comparison: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      debugger
      const formArray = control as FormArray;

      const origins = formArray.value.map((value: any) => get(value, comparison));
      
      const isDuplicate = origins.some((origin: string, index: number) => {
        const nextOrigins = [...origins];
        nextOrigins.splice(index, 1);

        return origin && nextOrigins.includes(origin);
      });

      if (isDuplicate) {
        formArray.controls?.forEach((ctrl) => {
          ctrl.setErrors({ unique: true });
        });

        return { unique: true };
      }

      formArray.controls?.forEach((ctrl) => {
        if (ctrl?.hasError('unique')) {
          ctrl?.setErrors({ unique: null });
        }
      });
      return null;
    };
  }

  static atLeastMember(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;

      if (formArray.controls.length < length) {
        return ({ atLeastMember: true });
      }

      return null;
    };
  }


}
