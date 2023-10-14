// SearchFlightComponent
// {
//     validationMessages:{
//         'routes':'routes is mandatory',
//         ...
//     }
// }

// MultiPathComponent
// {
//     messagesDic={
//         'routes[0].origin':'origin is mandatory',
//         ...
//     }
// }
//
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
});
