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
  import { VService } from './v.service';
  
  fdescribe('SUT: VService', () => {
    let sut: VService;
    const fb = new FormBuilder();
    beforeEach(() => {
        sut = new VService();
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
            scenario: ''
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
            scenario: 'formGroup in formArray'
        }
  
    ].forEach((spec, index: number) => {
        it(`should get form validation errors in ${spec.scenario || index + 1} scenario`, () => {
            // arrange
            const form = fb.group(spec.form);
  
            // act
            sut.process(form);
  
            // assert
            expect(sut.messages).toEqual(spec.expected as any);
        });
    })
  
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
  
    it('should return errors for the given form array', () => {
        // Arrange
        const form = fb.group({
            routes: fb.group({
                test: [null, [Validators.required]]
            }),
            path: fb.group({
                test2: ['', []]
            }),
        });
        spyOn(sut as any, 'getErrorMessage').and.callThrough();
        spyOn(sut as any, 'setErrorMessage').and.callThrough();
  
        // Act
        sut.process(form);
  
        // Act
        form.controls.path.controls.test2.setValue('test');
  
        // Assert
        expect(sut['setErrorMessage'] as jasmine.Spy).toHaveBeenCalledTimes(2);
        expect(sut['getErrorMessage'] as jasmine.Spy).toHaveBeenCalledTimes(1);
    });
  });
  
  