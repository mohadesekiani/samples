import { Component, Input, Optional, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
// import { CustomValidations } from 'src/app/core/validations/custom-validations';
import {
  GeneralTypesEnum,
  PassengerTypesEnum,
} from 'src/app/models/general-types.enum';
import { IPassengerTypes } from 'src/app/models/passenger-types.interface';

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
  constructor(
    private fb: FormBuilder // @Optional() @Self() public ngControl: NgControl
  ) {
    // if (this.ngControl != null) {
    //   // Setting the value accessor directly (instead of using
    //   // the providers) to avoid running into a circular import.
    //   this.ngControl.valueAccessor = this;
    // }
  }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.passengers = this.fb.group<any>({
      adult: [null, [Validators.required]],
      child: [null],
      infant: [null, [this.childrenCountValidator()]],
    });
    this.passengers.valueChanges.pipe(distinctUntilChanged()).subscribe(x=>{
      this.refersValue();
    })
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

  passengers!: FormGroup;
  

  disabled = false;
  touched = false;
  onChange = (value) => {
    value;
  };
  onTouched = () => {};

  writeValue(obj: any): void {

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
  showDrop = false;
  //rename
  passenger: Array<any> = [
    { value: 0, name: 'adult' },
    { value: 0, name: 'child' },
    { value: 0, name: 'infant' },
  ];

  decrees(item) {
    if (item.value <= 0) {
      return;
    }

    item.value = item.value - 1;
  }

  increase(item) {
    // item.value = item.value + 1;
    // todo
  }

  refersValue() {
    //TODO if is empty or invalid return null
    this.onChange(this.passengers.value);
    this.markAsTouched();
  }
}

