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
  ): any {
    const errorMessages: { [key: string]: string } = {
      required: `The field "${control}" is mandatory.`,
      dateInvalid: `The selected date for "${control}" is not allowed.`,
      returnDateInvalid: `The selected date for "${control}" cannot be smaller than the original date.`,
      max: `The number of "${control}" cannot be more than adults.`,
      minlength: `Min length for "${control}" is ${errorValue.requiredLength}.`,
    };
    if (errorMessages.hasOwnProperty(errorKey)) {
      return errorMessages[errorKey];
    }
    if (customMessage) {
      return this.createCustomErrorMessage(customMessage, errorValue);
    }
  }
  private createCustomErrorMessage(
    customMessage: string | undefined,
    errorValue: any
  ) {
    if (typeof errorValue === 'object') {
      return `${customMessage} with value: ${Object.keys(errorValue)[0]}:${
        Object.values(errorValue)[0]
      },${Object.keys(errorValue)[1]}:${Object.values(errorValue)[1]}.`;
    } else {
      return `${customMessage}`;
    }
  }
}
