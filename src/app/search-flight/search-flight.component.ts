import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassTypesEnum } from 'src/app/core/module/enum/class-types.enum';
import { TravelTypesEnum } from 'src/app/core/module/enum/travel-types.enum';
import {
  IForm,
  ISearchFlight,
} from 'src/app/core/module/interface/search-types.interface';
import { ValidationErrorService } from '../shared/services/validation-error.service';
import { BaseForm } from '../core/constant/base-component/base-form';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss'],
})
export class SearchFlightComponent extends BaseForm<ISearchFlight> {
  baseFormConfig:IForm<ISearchFlight> = {
    passengers: [null, [Validators.required]],
    travelType: [TravelTypesEnum.OneWay],
    classType: [null, [Validators.required]],
    routes: [null, [Validators.required]],
  };
  override form: FormGroup<IForm<ISearchFlight>> = super.createForm(
    this.baseFormConfig,
    null
  );

  classTypes = Object.values(ClassTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  today = new Date();
  showDrop = false;
  passenger: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];

  // travelTypes
  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  get travelType(): TravelTypesEnum {
    return this.form.controls.travelType?.value as TravelTypesEnum;
  }

  constructor(
    private router: Router,
    private formValidationError: ValidationErrorService
  ) {
    super();
  }

  submit() {
    this.formValidationError.process(this.form);

    if (this.form.invalid) {
      this.form.markAsDirty();
      this.form.markAllAsTouched();

      return;
    }

    this.router.navigate(['/result-flight']);
  }
}
