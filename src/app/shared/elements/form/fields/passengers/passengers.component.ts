import { Component } from '@angular/core';
import { isEqual } from 'lodash-es';
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
import { distinctUntilChanged, merge } from 'rxjs';
import { CustomValidators } from 'src/app/core/validations/passenger.validation';
import { IForm } from 'src/app/reactive-form/reactive-form.component';

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
  form!: FormGroup; // <IForm<ISearchPassenger>>;
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

  //ontic without controlValueAccessor
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
  getInfantError(item: string) {
    return item == 'Infant' && this.form.controls['Infant'].hasError('max');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group<IForm<ISearchPassenger>>(
      {
        Adult: [null, [Validators.required]],
        Child: [null],
        Infant: [null],
      },
      {
        validators: [CustomValidators.maxFrom('Infant', 'Adult')],
      }
    );

    this.form.valueChanges.pipe(distinctUntilChanged((p, c) => isEqual(p, c))).subscribe((x) => {
      this.refersValue();
    });
  }

  onChange = (value) => {
    value;
  };

  onTouched = () => { };

  writeValue(obj: any): void {
    this.form.patchValue(obj);
  }

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
    debugger
    this.onChange(this.form.invalid ? null : this.form.value);
    this.markAsTouched();
  }

  toggleDropDown() {
    this.showDrop = !this.showDrop;
  }
}
