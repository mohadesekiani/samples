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
    }

    if (control instanceof FormArray) {
      control.controls.forEach((ctrl, index) => {
        const keys=[...parentKey];
        keys[keys.length - 1] += `[${index}]`;
        this.process(ctrl, keys);
      });
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

    if (control.status === 'INVALID') {
      for (let key in control.errors) {
        this.messages[finalKey] = this.getErrorMessage(
          parentKey[parentKey.length - 1],
          key,
          control.errors[key]
        );
      }
      return;
    }

    delete this.messages[finalKey];
  }

  private getErrorMessage(control: string, errorKey: string, errorValue: any): string {
    switch (errorKey) {
      case 'required':
        return `The field "${control}" is mandatory.`;
      case 'dateInvalid':
        return `The selected date for "${control}" is not allowed.`;
      case 'returnDateInvalid':
        return `The selected date for "${control}" cannot be smaller than the original date.`;
      case 'max':
        return `The number of "${control}" cannot be more than adults.`;
      case 'minlength':
        {
          return `Min length for "${control}" is ${errorValue.requiredLength} .`;
        }
      default:
        return `Validation error for "${control}".`;
    }
  }
}
