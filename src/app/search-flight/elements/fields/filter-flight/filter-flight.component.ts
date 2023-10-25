import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { classesTypesEnum } from 'src/app/core/module/enum/general-types.enum';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import {
  IFilterFlight,
  IForm,
} from 'src/app/core/module/interface/search-types.interface';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';

@Component({
  selector: 'app-filter-flight',
  templateUrl: './filter-flight.component.html',
  styleUrls: ['./filter-flight.component.scss'],
})
export class FilterFlightComponent {
  //TODO baseClass
  panelOpenState = false;
  classes = Object.values(classesTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));
  allItems!: ICity[];
  filteredItems!: ICity[];
  form = this.createForm();

  constructor(
    private fb: FormBuilder,
    private abstractDataService: AbstractDataService
  ) {
    if (!fb) {
      throw 'formBuilder is null';
    }
  }

  ngOnInit(): void {    
    this.abstractDataService.items$.subscribe((items: ICity[]) => {
      this.allItems = items;
    });
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.applyFilter(this.form.value as IFilterFlight);
      });

    this.abstractDataService.getAllFakeData();
  }

  applyFilter(filter: IFilterFlight) {
    if (filter === null) {
      return;
    }
    this.filteredItems = this.allItems.filter((item) => {
      return this.timeRange(item, filter) && this.priceRange(item, filter);
    });
    console.log(this.filteredItems);
  }
  private createForm() {
    return this.fb.group<IForm<IFilterFlight>>({
      timeRange: [{ startTime: 300, endTime: 1320 }],
      priceRange: [{ minPrice: 0, maxPrice: 10 }],
      class: [null],
      airline: [null],
    });
  }
  private timeRange(item: ICity, filter: IFilterFlight) {
    if (!filter.priceRange.minPrice && !filter.priceRange.maxPrice) {
      return false;
    }
    return (
      item.time >= filter.timeRange.startTime &&
      item.time <= filter.timeRange.endTime
    );
  }
  private priceRange(item: ICity, filter: IFilterFlight) {
    if (!filter.priceRange.minPrice && !filter.priceRange.maxPrice) {
      return false;
    }
    return (
      item.price >= filter.priceRange.minPrice &&
      item.price <= filter.priceRange.maxPrice
    );
  }
}
