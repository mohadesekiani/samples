import { Component } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
export type IForm<T> = {
  [K in keyof T]?: any;
};
export interface ISearchPassenger {
  Adult: number;
  Child: number;
  Infant: number;
}
@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PassengersComponent,
    },
  ],
})
export class PassengersComponent implements ControlValueAccessor {
  errorMessage!: { actual: number; max: number };
  hasError: boolean = false;
  form!: FormGroup;
  buttonText: string = '+';
  disabled = false;
  touched = false;
  showDrop = false;
  //rename
  passenger: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];

  // onChildValueChange(newValue: number, item) {
  //   // ref.value = newValue;
  //   // this.passengers.value[item.name] = newValue;
  //   let ctrl = this.passengers.get(item.name);
  //   ctrl?.setValue(newValue);
  //   this.refersValue();
  // }

  // decrees(item) {
  //   let ctrl = this.form.get(item.name);
  //   if (ctrl?.value <= 0) {
  //     return;
  //   }
  //   ctrl?.setValue(ctrl.value - 1);
  //   this.refersValue();
  // }

  // increased(item) {
  //   let ctrl = this.form.get(item.name);
  //   ctrl?.setValue(ctrl.value + 1);
  //   this.refersValue();
  // }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group<IForm<ISearchPassenger>>(
      {
        Adult: [null, [Validators.required]],
        Child: [null],
        Infant: [null, [this.childrenCountValidator()]],
      },
      {
        validators: [this.childrenCountValidator()],
      }
    );

    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      this.refersValue();
      // this.errorMessage = this.form.get('Infant')?.getError('max');
      // console.log(this.form.get('Infant')?.hasError('max'));
    });
  }

  childrenCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var fg = control as FormGroup;
      if (!fg) {
        return null;
      }
      let infantValue = fg.value?.Infant;
      let adultValue = fg.value?.Adult;
      if (infantValue > adultValue) {
        return { max: { actual: infantValue, max: adultValue } };
      }

      return null;
    };
  }

  onChange = (value) => {
    value;
  };

  onTouched = () => {};

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  refersValue() {
    if (this.form.value === null) {
      return null;
    }
    this.onChange(this.form.value);
    this.markAsTouched();
    return;
  }

  toggleDropDown() {
    this.showDrop = !this.showDrop;
  }
}
