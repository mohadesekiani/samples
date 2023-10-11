import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(key: string): string {
    let errorMessages: any = [];
    switch (key) {
      case 'required':
        errorMessages.push(`This field is mandatory.`);
        break;
      case 'dateInvalid':
        errorMessages.push(`The selected date is not allowed.`);
        break;
      case 'returnDateInvalid':
        errorMessages.push(
          `The selected date cannot be smaller than the original date.`
        );
        break;
      case 'max':
        errorMessages.push(
          `The number of infant cannot be more than adults.`
        );
        break;
    }
    return errorMessages.join(',') ?? '';
  }
}
