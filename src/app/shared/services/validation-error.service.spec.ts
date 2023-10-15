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
  const fb = new FormBuilder();
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

    const errors = sut.process(form);

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
    const arrayFormErrors = sut.process(formArray);
    console.log(arrayFormErrors);

    expect(arrayFormErrors).toEqual({
      'routes[0].origin': 'The field "origin" is mandatory.',
    });
  });

  it('should return errors for the given form array', () => {
    const formArray = new FormGroup({
      routes: new FormGroup({
        origin: new FormGroup({
          location: new FormControl(null, Validators.required),
        }),
      }),
    });

    const arrayFormErrors = sut.process(formArray);

    expect(arrayFormErrors).toEqual({
      'routes.origin.location': 'The field "location" is mandatory.',
    });
  });

  it('should return errors for the given form array', () => {
    const formArray = fb.group({
      routes: fb.group({
        origin: new FormGroup({
          location: new FormArray([
            new FormGroup({
              path: new FormControl(null, Validators.required),
            }),
          ]),
        }),
      }),
    });
    sut.process(formArray);

    expect(sut.messages).toEqual({
      'routes.origin.location[0].path': 'The field "path" is mandatory.',
    });
  });

  fit('should return errors for the given form array', () => {
    const form = fb.group({
      routes: fb.group({
        origin: new FormGroup({
          location: new FormArray([
            new FormGroup({
              path: new FormControl('test', Validators.required),
            }),
          ]),
        }),
      }),
    });
    sut.process(form);
    form.patchValue({
      routes: {
        origin: {
          location: [{ path: null }],
        },
      },
    });
    console.log(sut.messages);

    expect(sut.messages).toEqual({

      'routes.origin.location[0].path': 'The field "path" is mandatory.',
    });
  });
});
// {
//     'location[0].path': 'The field "path" is mandatory.',
//     'origin.location[0].path': 'The field "path" is mandatory.',
//     'path': 'The field "path" is mandatory.',
//     'routes.origin.location[0].path': 'The field "path" is mandatory.',
//   }
