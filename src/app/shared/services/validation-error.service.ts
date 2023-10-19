import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormControlStatus,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  messages: { [key: string]: string } = {};
  subs: Array<Subscription> = [];
  customMessages: { [key: string]: { [key: string]: string } } = {};

  setCustomMessages(messages: {
    [key: string]: { [key: string]: string };
  }): void {
    this.customMessages = messages;
  }
  process(control: AbstractControl, parentKey: Array<string> = []): void {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((key) => {
        this.process(control.controls[key], [...parentKey, key]);
      });
    }

    if (control instanceof FormArray) {
      control.controls.forEach((ctrl, index) => {
        const keys = [...parentKey];
        keys[keys.length - 1] += `[${index}]`;
        this.process(ctrl, keys);
      });
    }

    let controlState = control.status;
    control.statusChanges.subscribe((status: FormControlStatus) => {
      if (status !== 'INVALID' && controlState !== 'INVALID') {
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
        const customMessage = this.customMessages[finalKey]?.[key];
        // customMessage ? (key = 'customError') : key;
        this.messages[finalKey] = this.getErrorMessage(
          parentKey[parentKey.length - 1],
          key,
          control.errors[key],
          customMessage
        );
      }
      return;
    }

    delete this.messages[finalKey];
  }

  private getErrorMessage(
    control: string,
    errorKey: string,
    errorValue: any,
    customMessage: string | undefined
  ): string {
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
        return `Min length for "${control}" is ${errorValue.requiredLength} .`;
      case `${errorKey}`:
        if (customMessage) {
          if (typeof errorValue === 'object') {
            return `${customMessage || 'Custom validation error'} with value: ${
              Object.values(errorValue)[0]
            }, ${Object.values(errorValue)[1]}.`;
          } else {
            return `${customMessage}`;
          }
        }
      default:
        return `Validation error for "${control}".`;
    }
  }
}
