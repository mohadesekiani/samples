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
        routes: 'Min length for "routes" is 3.',
      },
      scenario: 'formGroup in formArray',
    },
    {
      form: {
        routes: new FormGroup({
          origin: new FormGroup({
            location: new FormControl(null, Validators.required),
          }),
        }),
      },
      expected: {
        'routes.origin.location': 'The field "location" is mandatory.',
      },
      scenario: 'formGroup in formGroup',
    },
    {
      form: {
        routes: fb.group({
          origin: fb.group({
            location: fb.array([
              fb.group({
                path: fb.control(null, Validators.required),
              }),
            ]),
          }),
        }),
      },
      expected: {
        'routes.origin.location[0].path': 'The field "path" is mandatory.',
      },
      scenario: 'formGroup.formGroup.formArray',
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
    const expected_error = 'routes has some error';
    const form = fb.group({
      routes: [],
    });
    form.controls.routes.setErrors({ some_error: true });

    sut.setCustomMessages({ routes: { some_error: 'routes has some error' } });
    // sut.setCustomValidator(customValidator, pathControl);
    sut.process(form);

    expect(sut.messages).toEqual({
      routes: expected_error,
    });
  });
  it('should handle custom error message', () => {
    const expected_error = 'routes has some error with value: min:1,max:3.';
    const form = fb.group({
      routes: [],
    });
    form.controls.routes.setErrors({ some_error: { min: 1, max: 3 } });

    sut.setCustomMessages({
      routes: { some_error: 'routes has some error' },
    });
    sut.process(form);
    expect(sut.messages).toEqual({
      routes: expected_error,
    });
  });
});
