import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from 'src/app/search-flight/services/filter.service';

@Component({
  selector: 'app-filter-flight',
  templateUrl: './filter-flight.component.html',
  styleUrls: ['./filter-flight.component.scss'],
})
export class FilterFlightComponent {
  //baseClass
  form: FormGroup;
  max = 24;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  constructor(private fb: FormBuilder, public filterService: FilterService) {
    this.form = this.fb.group({
      hourRange: [this.filterService.hourRange],
      priceRange: [this.filterService.priceRange],
      selectedAirline: [this.filterService.selectedAirline],
      selectedClass: [this.filterService.selectedClass],
    });
  }
}
