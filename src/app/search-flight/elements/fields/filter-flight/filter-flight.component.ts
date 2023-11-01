import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ClassesTypesFlightEnum, CompanyTypesFlightEnum } from 'src/app/core/module/enum/general-types.enum';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import {
  IClassFlight,
  ICompanyFlight,
  IFilterFlight,
  IForm,
} from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-filter-flight',
  templateUrl: './filter-flight.component.html',
  styleUrls: ['./filter-flight.component.scss'],
})
export class FilterFlightComponent {
  //TODO baseClass
  baseFormConfig: IForm<any> = {
    classes: this.fb.array([]),
  };
  baseFormConfigCompany: IForm<any> = {
    companies: this.fb.array([]),
  };
  classesTypesFlight: any = Object.values(ClassesTypesFlightEnum).map(
    (value) => ({
      title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
      value,
    })
  );
  companyTypesFlight: any = Object.values(CompanyTypesFlightEnum).map(
    (value) => ({
      title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
      value,
    })
  );
  panelOpenState = false;
  classes = Object.values(ClassesTypesFlightEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));
  allItems!: ICity[];
  filteredItems!: ICity[];
  form = this.createForm();
  @Output() newItemEvent = new EventEmitter<IFilterFlight>();

  get getFormValue(): IFilterFlight {
    return this.form.value as IFilterFlight;
  }

  constructor(private fb: FormBuilder) {
    if (!fb) {
      throw 'formBuilder is null';
    }
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.newItemEvent.emit(this.getFormValue);
      });
  }

  private createForm() {
    return this.fb.group<IForm<IFilterFlight>>({
      timeRange: [{ startTime: 300, endTime: 1320 }],
      priceRange: [{ minPrice: 0, maxPrice: 10 }],
      class: [],
      company: [],
      airline: [null],
    });
  }
}
