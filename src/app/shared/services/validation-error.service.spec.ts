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

// {
// messagesDic={
//     'routes.origin.location':'location is mandatory',
//     ...
// }
// }
//

// {
// messagesDic={
//     'routes.origin.location[0].path':'path is mandatory',
//     ...
// }
// }
//
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidationErrorService } from './validation-error.service';

fdescribe('ValidationErrorService', () => {
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
    console.log(arrayFormErrors);

    expect(arrayFormErrors).toEqual({
      'routes[0].origin': 'The field "routes[0].origin" is mandatory.',
    });
  });

  fit('should return errors for the given form array', () => {
    const formArray = new FormGroup({
      routes: new FormGroup({
        origin: new FormGroup({
          location: new FormControl(null, Validators.required),
        }),
      }),
    });

    const arrayFormErrors = sut.getFormValidationErrors(formArray);

    expect(arrayFormErrors).toEqual({
      'routes[0].origin': 'Origin is mandatory.',
    });
  });

  fit('should return errors for the given form array', () => {
      const formArray = new FormBuilder().group({
          routes: {
              origin: new FormGroup({
                  location: new FormArray([
                      new FormControl(null, Validators.required),
                  ])
              }),
          },
      });

      const arrayFormErrors = sut.getFormValidationErrors(formArray);

      expect(arrayFormErrors).toEqual({
          'routes[0].origin': 'Origin is mandatory.',
      });
  });
});
