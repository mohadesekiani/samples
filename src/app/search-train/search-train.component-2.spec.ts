import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralTypesEnum } from '../core/module/enum/general-types.enum';
import {
  TravelTrainTypesEnum,
  TravelTypesEnum,
} from '../core/module/enum/travel-types.enum';
import { ValidationErrorService } from '../shared/services/validation-error.service';
import { SearchTrainComponent } from './search-train.component';
import { SearchTrainFormBuilder } from './search-train.component.spec.builder';

fdescribe('SUT: SearchTrainComponent 2', () => {
  let sut: SearchTrainComponent;
  const sutBuilder = new SearchTrainFormBuilder();

  it('should be create properly', () => {
    // arrange
    sut = sutBuilder.build();

    // assert
    expect(sut).toBeTruthy();
    expect(sut.resultUrl).toBe('/result-train');
  });

  it('should be create form with default value', () => {
    // arrange
    sut = sutBuilder.build();

    // assert
    expect(sut.form.value).toEqual({
      route: null,
      passengers: null,
      general: null,
      travelType: TravelTypesEnum.OneWay,
    });
  });

  it('should be when submit routing to `/result-train` with condition valid form', () => {
    // arrange
    sut = sutBuilder.with_some_valid_data_for_form().build();

    // act
    sut.submit();

    // assert
    expect(sut.form.dirty).toBe(false);
    expect(sutBuilder.router.navigate).toHaveBeenCalledWith(['/result-train']);
  });

});
