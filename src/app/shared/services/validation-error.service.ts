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
export class ValidationErrorService {
  messages: { [key: string]: string } = {};
  subs: Array<Subscription> = [];

  process(control: AbstractControl, parentKey: string = ''): void {

    if (control instanceof FormArray) {

      control.controls.forEach((ctrl, index) => {
        this.process(ctrl, `${parentKey}[${index}]`);
      });

      return;
    }

    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((key) => {
        this.process(control.controls[key], `${parentKey}${parentKey ? '.' : ''}${key}`);
      });

      return;
    }
    let controlState = control.status;
    const temp = control.statusChanges.subscribe((state: FormControlStatus) => {
      if (state !== 'INVALID' && controlState !== 'INVALID') {
        return;
      }

      controlState = state;
      this.setErrorMessage(state, parentKey, control);
    });
    this.setErrorMessage(controlState, parentKey, control);

    this.subs.push(temp);
  }

  private setErrorMessage(state: FormControlStatus, parentKey: string, control: AbstractControl) {
    if (state !== 'INVALID') {
      delete (this.messages[parentKey]);
      return;
    }

    for (const key in control.errors) {
      this.messages[parentKey] = this.getErrorMessage(parentKey.split('.').slice(-1)[0], key);
      break;
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
