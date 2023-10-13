import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(key: string): string {
    let errorMessages!: string;
    switch (key) {
      case 'required':
        errorMessages = 'This field is mandatory';
        break;
      case 'dateInvalid':
        errorMessages = 'The selected date is not allowed.';
        break;
      case 'returnDateInvalid':
        errorMessages =
          'The selected date cannot be smaller than the original date.';
        break;
      case 'max':
        errorMessages = 'The number of infant cannot be more than adults.';
        break;
    }
    return errorMessages ?? '';
  }
}
