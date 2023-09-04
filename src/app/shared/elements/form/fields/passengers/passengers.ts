import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GeneralTypesEnum, PassengerTypesEnum } from 'src/app/models/general-types.enum';

type EnumKeys = keyof typeof PassengerTypesEnum;
export interface IPassengerTypes {
  // [key in keyof typeof  PassengerTypesEnum]: number;
  // [ket: string]: number;
  Adult: number;
  Child: number;
  Infant: number;
};

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: PassengersComponent },
  ],
})
export class PassengersComponent implements ControlValueAccessor {
  value: IPassengerTypes = {
    Adult: 0,
    Child: 0,
    Infant: 0,
  };
  disabled = false;
  touched = false;
  onChange = (value) => { };
  onTouched = () => { };

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
    { value: 0, name: 'Infant', increase: this.infantIncrease },
  ];

  decrees(item) {
    if (item.value <= 0) { return; }

    item.value = item.value - 1;
  }

  increase(item) {
    item.value = item.value + 1;
    console.log(item.value);
  }

  infantIncrease(item) {
    if (item.value === 0) item.value = 1;
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
