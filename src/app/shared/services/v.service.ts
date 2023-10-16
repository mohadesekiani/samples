import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormControlStatus,
  FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VService {
  messages: { [key: string]: string } = {};
  subs: Array<Subscription> = [];
  process(control: AbstractControl, parentKey: Array<string> = []): void {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((key) => {
        this.process(control.controls[key], [...parentKey, key]);
      });
      return;
    }
    if (control instanceof FormArray) {
      control.controls.forEach((ctrl, index) => {
        this.process(ctrl, [...parentKey, `[${index}]`]);
      });
      return;
    }
    let parentState = control.status;
    control.statusChanges.subscribe((status: FormControlStatus) => {
      if (status !== 'INVALID' && parentState !== 'INVALID') {
        return;
      }
      this.setErrorMessage(control, parentKey);
    });
    this.setErrorMessage(control, parentKey);
  }

  private setErrorMessage(control: AbstractControl, parentKey: Array<string>) {
    const finalKey = parentKey.join('.');
   let replaceFinalKey = finalKey.replace(".[", "[")

    if (control.status === 'INVALID') {
      for (let key in control.errors) {
        this.messages[replaceFinalKey] = this.getErrorMessage(
          parentKey[parentKey.length - 1],
          key
        );
      }
    } else {
      delete this.messages[replaceFinalKey];
    }
  }

  private getErrorMessage(control: string, error: string): string {
    switch (error) {
      case 'required':
        return `The field "${control}" is mandatory.`;
      case 'dateInvalid':
        return `The selected date for "${control}" is not allowed.`;
      case 'returnDateInvalid':
        return `The selected date for "${control}" cannot be smaller than the original date.`;
      case 'max':
        return `The number of "${control}" cannot be more than adults.`;
      default:
        return `Validation error for "${control}".`;
    }
  }
}
