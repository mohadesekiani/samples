import { Component } from '@angular/core';
import { ClassesTypesFlightEnum } from 'src/app/core/module/enum/general-types.enum';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { IFilterFlight } from 'src/app/core/module/interface/search-types.interface';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';

@Component({
  selector: 'app-result-flight',
  templateUrl: './result-flight.component.html',
  styleUrls: ['./result-flight.component.scss'],
})
export class ResultFlightComponent {
  filterData!: IFilterFlight;
  filteredItems!: ICity[];
  allData!: ICity[];
  constructor(private dataService: AbstractDataService) {
    if (!this.dataService) {
      throw 'AbstractDataService is null';
    }
  }
  ngOnInit(): void {
    this.dataService.getAllFakeData().subscribe((items: ICity[]) => {
      this.filteredItems = items;
      this.allData = items;
    });
  }
  receiveData(value: IFilterFlight) {
    this.filterData = value;
    this.applyFilter(this.filterData);
  }

  private applyFilter(filter: IFilterFlight): ICity[] {
    this.filteredItems = this.timeCombinePrice(filter);
    if (filter.company) {
      let filterCompany: ICity[] = this.selectedCheckBox(
        filter.company,
        'company'
      );
      this.filteredItems = this.filteredItems.filter((value) =>
        filterCompany.includes(value)
      );
    }
    if (filter.class) {
      let filterClass: ICity[] = this.selectedCheckBox(filter.class, 'class');
      this.filteredItems = this.filteredItems.filter((value) =>
        filterClass.includes(value)
      );
    }

    return this.filteredItems;
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
  private timeCombinePrice(filter: IFilterFlight) {
    return this.allData.filter((item) => {
      return this.timeRange(item, filter) && this.priceRange(item, filter);
    });
  }

  private selectedCheckBox(filter: any, name: string): ICity[] {
    const trueKeysArray = Object.keys(filter).filter((key) => filter[key]);
    if (!filter) {
      return this.allData;
    }

    let tempFilteredItems = this.allData.slice();

    let commonElements = tempFilteredItems.filter((element) =>
      trueKeysArray.some((f) =>
        (element as Record<string, any>)[name].includes(f)
      )
    );
    if (commonElements.length === 0) {
      return this.filteredItems;
    }
    return commonElements;
  }
}
