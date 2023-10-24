import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFilterFlight, IForm } from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-filter-flight',
  templateUrl: './filter-flight.component.html',
  styleUrls: ['./filter-flight.component.scss'],
})
export class FilterFlightComponent {
  //baseClass

  form = this.createForm();
  constructor(private fb: FormBuilder) {}
  private createForm() {
    return this.fb.group<IForm<IFilterFlight>>({
      timeRange: [],
      priceRange: [],
      airline: [],
      class: [],
    });
  }
}
