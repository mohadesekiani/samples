import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BaseForm } from 'src/app/core/constant/base-component/base-form';
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
export class FilterFlightComponent extends BaseForm<IFilterFlight> {
  //TODO baseClass
  baseFormConfig: IForm<IFilterFlight> = {
    timeRange: [{ startTime: 300, endTime: 1320 }],
    priceRange: [{ minPrice: 0, maxPrice: 10 }],
    class: [],
    company: [],
    airline: [null],
  };
  override form: FormGroup<IForm<IFilterFlight>> = super.createForm(
    this.baseFormConfig,
    null
  );
  allItems!: ICity[];
  filteredItems!: ICity[];
  @Output() newItemEvent = new EventEmitter<IFilterFlight>();
  get getFormValue(): IFilterFlight {
    return this.form.value as IFilterFlight;
  }

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.newItemEvent.emit(this.getFormValue);
      });
  }
}
