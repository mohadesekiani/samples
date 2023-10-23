import { Component, HostListener, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { BaseInputControlValueAccessor } from 'src/app/core/constant/base-component/base-input-control-value-accessor';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FlightComponent,
    },
  ],
})
export class FlightComponent extends BaseInputControlValueAccessor<any> {
  @Input() validationErrorMessage!: any;

  @Input() label = '';
  override value: any = '';
  filterText = '';
  filteredCities!: Array<any>;
  citySelect = '';
  showCityNotFound = true;
  loading = false;

  constructor(private dataService: AbstractDataService) {
    super();
  }
  @HostListener('focusin')
  onFocus() {
    this.markAsTouched();
  }
  optionSelected(city: any) {
    let newValue = city.id;
    let nameValue = city.title;
    this.value = nameValue;
    this.filteredCities = [];
    this.showCityNotFound = false;
    this.updateValueAndValidity(newValue);
  }
  
  onCityInputChange(value: string) {
    this.filterText = value;

    if (this.isLessThanValidValue(value)) {
      this.clean();

      return;
    }

    this.loadData();
  }

  private loadData() {
    this.loading = true;
    this.dataService.getFakeData(this.filterText).subscribe({
      next: (res) => {
        this.filteredCities = res.map((city: ICity) => ({
          id: city.id,
          title: city.title,
        }));
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  private clean() {
    this.filteredCities = [];
    this.value = null;
    this.showCityNotFound = false;
    this.updateValueAndValidity(this.value);
  }

  private isLessThanValidValue(value: string) {
    return value.length < 2;
  }
}
