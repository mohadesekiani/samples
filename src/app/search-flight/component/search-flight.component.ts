import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClassTypesEnum } from 'src/app/core/module/enum/class-types.enum';
import { TravelTypesEnum } from 'src/app/core/module/enum/travel-types.enum';
import { ISearchFlight } from 'src/app/core/module/interface/search-types.interface';
import { BaseForm } from '../../core/constant/base-component/base-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss'],
})
export class SearchFlightComponent extends BaseForm<ISearchFlight> {
  classTypes = Object.values(ClassTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  get travelType(): TravelTypesEnum {
    // debugger
    return this.form.controls.travelType?.value as TravelTypesEnum;
  }

  override resultUrl: string = '/result-flight';

  override formConfig = {
    passengers: [null, [Validators.required]],
    travelType: [TravelTypesEnum.OneWay],
    classType: [null, [Validators.required]],
    routes: [null, [Validators.required]],
  };

  constructor(router: Router) {
    super(router);
  }
}
