import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationErrorService } from '../shared/services/validation-error.service';
import { ISearchTrain } from '../core/module/interface/search-types.interface';
import { GeneralTypesEnum } from '../core/module/enum/general-types.enum';
import { TravelTypesEnum } from '../core/module/enum/travel-types.enum';
import { SearchTrainComponent } from './search-train.component';
import { SearchFlightConst } from '../core/module/interface/search-flight.spec.const';

export class SearchTrainFormBuilder {
  router: jasmine.SpyObj<Router>;
  formValue!: ISearchTrain;

  constructor() {
    this.router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
  }

  with_some_valid_data_for_form(): SearchTrainFormBuilder {
    this.formValue = {
      route: {
        departureDate: new Date(),
        returnDate: new Date('2023/11/10'),
        origin: 'Abadan',
        destination: 'Abu Musa',
      },
      passengers: { Adult: 1, Child: 1, Infant: 1 },
      general: GeneralTypesEnum.General,
      travelType: TravelTypesEnum.OneWay,
    };
    return this;
  }

  with_some_invalid_data_for_form(): SearchTrainFormBuilder {
    this.formValue = {
      route: null,
      passengers: { Adult: 1, Child: 1, Infant: 1 },
      general: GeneralTypesEnum.General,
      travelType: TravelTypesEnum.OneWay,
    };
    return this;
  }

  build(): SearchTrainComponent {
    const sut = new SearchTrainComponent(this.router);

    sut.ngOnInit();

    if (this.formValue) {
      sut.form.patchValue(this.formValue);
    }
    return sut;
  }
}
