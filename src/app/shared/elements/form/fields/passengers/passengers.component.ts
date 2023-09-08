import { Component, Optional, Self } from '@angular/core';
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
import { CustomValidations } from 'src/app/core/validations/custom-validations';
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
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   multi: true,
    //   useExisting: PassengersComponent,
    // },
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
    this.passengerForm = this.fb.group<any>(
      {
        adult: [
          null,
          [Validators.required, CustomValidations.childrenCountValidator],
        ],
        child: [null],
        infant: [null],
      },
      {
        validators: [CustomValidations.childrenCountValidator],
      }
    );
  }

  passengerForm!: FormGroup;
  value: IPassengerTypes = {
    Adult: 0,
    Child: 0,
    Infant: 0,
  };
  disabled = false;
  touched = false;
  onChange = (value) => {
    value;
  };
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = { ...this.value, ...obj };
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
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];

  decrees(item) {
    if (item.value <= 0) {
      return;
    }

    item.value = item.value - 1;
  }

  increase(item) {
    item.value = item.value + 1;
  }

  refersValue() {
    let newValue = { Adult: 0, Child: 0, Infant: 0 };
    this.passenger.forEach((item) => {
      newValue[item.name] = item.value;
    });
    this.value = newValue;
    this.onChange(this.value);
    this.markAsTouched();
  }
}
