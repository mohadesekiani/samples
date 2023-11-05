import { FormBuilder } from '@angular/forms';
import { SearchTrainComponent } from './search-train.component';
import { Router } from '@angular/router';
import { GeneralTypesEnum } from '../core/module/enum/general-types.enum';
import { TravelTypesEnum } from '../core/module/enum/travel-types.enum';
import { ValidationErrorService } from '../shared/services/validation-error.service';

describe('SUT: SearchTrainComponent', () => {
  let sut: SearchTrainComponent;
  let fb: FormBuilder;
  let router: jasmine.SpyObj<Router>;
  let validationErrorService;
  beforeEach(() => {
    fb = new FormBuilder();
    router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
    validationErrorService = new ValidationErrorService();
    sut = new SearchTrainComponent();
    sut.ngOnInit();
  });

  it('should be create', () => {
    // assert
    console.log(sut);

    expect(sut).toBeTruthy();
  });

  it('should be set initialization form', () => {
    // assert
    expect(sut.form.value).toEqual({
      routes: null,
      passengers: null,
      general: null,
      travelType: TravelTypesEnum.OneWay,
    });
  });

  it(`should be when submit routing to "result-train with condition valid form "`, () => {
    // arrange
    sut.form.setValue({
      routes: [
        {
          departureDate: Date,
          returnDate: Date,
          origin: 'Abadan',
          destination: 'Abu Musa',
        },
      ],
      passengers: { Adult: 1, Child: 1, Infant: 1 },
      general: GeneralTypesEnum.General,
      travelType: TravelTypesEnum.OneWay,
    });

    // act
    sut.submit();

    // assert
    expect(router.navigate).toHaveBeenCalledWith(['/results-train']);
  });

  it('should be check form is invalid ', () => {
    // arrange
    spyOn(sut.form, 'markAllAsTouched');
    spyOn(sut.form, 'markAsDirty');
    sut.form.patchValue({
      passengers: null,
    });
    // act
    sut.submit();
    // assert
    expect(sut.form.markAllAsTouched).toHaveBeenCalled();
    expect(sut.form.markAsDirty).toHaveBeenCalled();
  });
});
