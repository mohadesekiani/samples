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
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ValidationErrorService } from './validation-error.service';
import { CustomValidators } from 'src/app/core/validations/custom.validators';

fdescribe('SUT: VService', () => {
  let sut: ValidationErrorService;
  const fb = new FormBuilder();
  beforeEach(() => {
    sut = new ValidationErrorService();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  [
    {
      form: {
        firstName: ['', [Validators.required]],
        lastName: [''],
      },
      expected: {
        firstName: 'The field "firstName" is mandatory.',
      },
      scenario: '',
    },

    {
      form: {
        routes: new FormArray([
          new FormGroup({
            origin: new FormControl(null, Validators.required),
          }),
        ]),
      },
      expected: {
        'routes[0].origin': 'The field "origin" is mandatory.',
      },
      scenario: 'formGroup in formArray',
    },
    {
      form: {
        routes: new FormArray(
          [
            new FormGroup({
              origin: new FormControl(null, Validators.required),
            }),
          ],
          {
            validators: [Validators.minLength(3)],
          }
        ),
      },
      expected: {
        'routes[0].origin': 'The field "origin" is mandatory.',
        routes: 'Min length for "routes" is 3 .',
      },
      scenario: 'formGroup in formArray',
    },
  ].forEach((spec, index: number) => {
    it(`should get form validation errors in ${
      spec.scenario || index + 1
    } scenario`, () => {
      // arrange
      const form = fb.group(spec.form);

      // act
      sut.process(form);

      // assert
      expect(sut.messages).toEqual(spec.expected as any);
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

    sut.process(formArray);

    expect(sut.messages).toEqual({
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

  it('should return errors for the given form array', () => {
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
    //
    sut.process(form);

    form.patchValue({
      routes: {
        origin: {
          location: [{ path: null }],
        },
      },
    });
    // form.updateValueAndValidity();
    expect(sut.messages).toEqual({
      'routes.origin.location[0].path': 'The field "path" is mandatory.',
    });

    // expect(sut.subs2.length).toBe(1);
    // expect(sut.subs.length).toBe(1);
  });

  it('should return errors for the given form array', () => {
    const form = fb.group({
      routes: fb.group({
        origin: new FormGroup({
          location: new FormArray([
            new FormGroup({
              path: new FormControl('', Validators.required),
            }),
          ]),
        }),
      }),
    });

    sut.process(form);

    expect(sut.messages).toEqual({
      'routes.origin.location[0].path': 'The field "path" is mandatory.',
    });

    form.patchValue({
      routes: {
        origin: {
          location: [{ path: 'test' }],
        },
      },
    });

    expect(sut.messages).toEqual({});
    // expect(sut.subs.length).toBe(1);
    // expect(sut.watchFormChanges as jasmine.Spy).toHaveBeenCalledTimes(8);
  });

  it('should handle custom error message', () => {
    const customValidator: any = (control: FormControl) => {
      if (control.value === 'test') {
        return { customError: true };
      }
      return null;
    };

    const form = fb.group({
      routes: fb.group({
        path: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
      }),
    });
    const pathControl: any = form.get('routes.path');

    sut.setCustomValidator(customValidator, pathControl);
    sut.process(form);

    form.patchValue({
      routes: {
        path: 'test',
        location: 'test',
      },
    });
    expect(sut.messages).toEqual({
      'routes.path': 'Custom validation error for "path".',
    });
  });

  it('should handle custom error message', () => {
    const customValidator: any = (control: FormControl) => {
      if (control.value === 'test') {
        return { customError: true };
      }
      return null;
    };

    const form = fb.group({
      routes: fb.group({
        origin: new FormGroup({
          location: new FormArray([
            new FormGroup({
              path: new FormControl('', Validators.required),
            }),
          ]),
        }),
      }),
    });
    const pathControl = form.controls.routes.controls.origin.controls.location.at(0).controls.path
    console.log(pathControl);
    sut.setCustomValidator(customValidator, pathControl);

    sut.process(form);

    form.patchValue({
      routes: {
        origin: {
          location: [{ path: 'test' }],
        },
      },
    });
    expect(sut.messages).toEqual({
      'routes.origin.location[0].path': 'Custom validation error for "path".',
    });
  });
});
