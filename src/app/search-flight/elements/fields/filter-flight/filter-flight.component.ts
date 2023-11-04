import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BaseForm } from 'src/app/core/constant/base-component/base-form';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import {
  IFilterFlight,
  IForm,
} from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-filter-flight',
  templateUrl: './filter-flight.component.html',
  styleUrls: ['./filter-flight.component.scss'],
})
export class FilterFlightComponent extends BaseFormControlValueAccessor<IFilterFlight> {
  override formConfig: IForm<IFilterFlight> = {
    timeRange: [{ startTime: 300, endTime: 1320 }],
    priceRange: [{ minPrice: 0, maxPrice: 10 }],
    class: [],
    company: [],
    airline: [null],
  };
  allItems!: ICity[];
  filteredItems!: ICity[];
  get formValue(): IFilterFlight {
    return this.form.value as IFilterFlight;
  }

  constructor() {
    super();
  }

}
