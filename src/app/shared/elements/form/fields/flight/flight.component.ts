import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { ICity } from 'src/app/models/city-type.interface';
import { BaseControlValueAccessor } from 'src/app/shared/base-component/base-control-value-accessor';

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
export class FlightComponent extends BaseControlValueAccessor {
  @Input() label = '';
  value: any = '';
  filterText = '';
  disabled!: boolean;
  touched = false;
  filteredCities!: Array<any>;
  citySelect = '';
  showCityNotFound = true;
  loading = false;

  constructor(private dataService: AbstractDataService) {
    super();
    if (!dataService) {
      throw new Error('dataService is empty');
    }
  }

  @HostListener('focusin')
  onFocus() {
    this.markAsTouched();
  }

  override writeValue(obj: any): void {
    this.value = obj;
  }

  override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (this.touched) {
      return;
    }

    this.onTouched(null);
    this.touched = true;
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
    // todo finalize pipe to this.loading = false;
    this.loading = true;
    this.dataService.getFakeData(this.filterText).subscribe({
      next: (res) => {
        this.filteredCities = res.map((city: ICity) => ({
          id: city.id,
          name: city.alternateTitle,
        }));
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  optionSelected(city: any) {
    let newValue = city.id;
    let nameValue = city.name;
    this.value = nameValue;
    this.filteredCities = [];
    this.showCityNotFound = false;
    this.onChange(newValue);
    this.markAsTouched();
  }

  private clean() {
    this.filteredCities = [];
    this.value = null;
    this.showCityNotFound = false;
    this.onChange(this.value);
    this.markAsTouched();
  }

  private isLessThanValidValue(value: string) {
    return value.length < 2;
  }
}
