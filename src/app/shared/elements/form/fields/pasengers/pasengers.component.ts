import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export interface IPassengerTypes {
  Adult: number; Children: number; Infant: number;
}
@Component({
  selector: 'app-pasengers',
  templateUrl: './pasengers.component.html',
  styleUrls: ['./pasengers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasengersComponent,
    },
  ],
})
export class PasengersComponent implements ControlValueAccessor {
  // ########################################################
  //              control value accessor scope              #
  // ########################################################
  value: IPassengerTypes = {
    Adult: 0,
    Children: 0,
    Infant: 0,
  };
  disabled = false;
  touched = false;
  onChange = (value) => { };
  onTouched = () => { };

  writeValue(obj: any): void {
    this.value = obj;
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
  // ########################################################
  showDrop = false;
  //rename
  passanger: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Children' },
    { value: 0, name: 'Infant', increase: this.InfantIncrease },
  ];

  decrese(item) {
    if (item.value > 0) item.value = item.value - 1;
  }

  increase(item) {
    item.value = item.value + 1;
    console.log(item.value);
  }

  InfantIncrease(item) {
    if (item.value === 0) item.value = 1;
  }

  refresValue() {
    let newValue = { Adult: 0, Children: 0, Infant: 0 };
    this.passanger.forEach((item) => {
      newValue[item.name] = item.value;
    });
    this.value = newValue;
    this.onChange(this.value);
    this.markAsTouched();
  }
}
