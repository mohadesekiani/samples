// SearchFlightComponent
// {
//     validationMessages:{
//         'routes':'routes is mandatory',
//         ...
//     }
// }

// MultiPathComponent
// {
// messagesDic={
//     'routes[0].origin':'origin is mandatory',
//     ...
// }
// }
//
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationErrorService } from './validation-error.service';

describe('ValidationErrorService', () => {
  let sut: ValidationErrorService;
  beforeEach(() => {
    sut = new ValidationErrorService();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should get form validation errors', () => {
    const form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
    });

    const errors = sut.getFormValidationErrors(form);

    expect(errors).toEqual({
      firstName: 'The field "firstName" is mandatory.',
    });
  });

  it('should return errors for the given form array', () => {
    const formArray = new FormGroup({
      routes: new FormArray([
        new FormGroup({
          origin: new FormControl(null, Validators.required),
        }),
      ]),
    });
    const arrayFormErrors = sut.getFormValidationErrors(formArray);

    expect(arrayFormErrors).toEqual({
      'routes[0].origin': 'Origin is mandatory.',
    });
  });
});
