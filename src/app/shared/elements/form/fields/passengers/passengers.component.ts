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
  errorMasseage!: { actual: number; max: number };
  hasError: boolean = false;
  passengers!: FormGroup;
  buttonText: string = '+';
  disabled = false;
  touched = false;
  showDrop = false;
  //rename
  passenger: Array<any> = [
    { value: 0, name: 'adult' },
    { value: 0, name: 'child' },
    { value: 0, name: 'infant' },
  ];

  onChildValueChange(newValue: number, item) {
    // ref.value = newValue;
    // this.passengers.value[item.name] = newValue;
    let ctrl = this.passengers.get(item.name);
    ctrl?.setValue(newValue);
    this.refersValue();
  }

  decrees(item) {
    let ctrl = this.passengers.get(item.name);
    if (ctrl?.value <= 0) {
      return;
    }
    ctrl?.setValue(ctrl.value - 1);
    this.refersValue();
  }

  // incresed( item) {
  //   // kkk
  //   // ref.value = +ref.value + 1;
  //   // علی اسم فرمه s داره
  //   //yeki omad khonamoon ki?
  //   let ctrl = this.passengers.get(item.name);
  //   ctrl?.setValue(ctrl.value + 1);
  //   //this.passengers.value[item.name] = ref.value;
  //   this.refersValue();
  // }
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.passengers = this.fb.group<any>({
      adult: [null, [Validators.required]],
      child: [null],
      infant: [null, [this.childrenCountValidator()]],
    });
    this.passengers.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      this.refersValue();
      this.errorMasseage = this.passengers.get('infant')?.getError('max');
      console.log(this.passengers.value);
    });
  }

  childrenCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let infantValue = control.value;
      let adultValue = this.passengers?.value['adult'];
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
    //TODO if is empty or invalid return null
    this.onChange(this.passengers.value);
    this.markAsTouched();
  }
}
