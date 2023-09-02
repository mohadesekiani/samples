import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';

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
export class FlightComponent implements ControlValueAccessor {
  @Input() label = '';
  value: any = '';
  filterText = '';
  disabled!: boolean;
  touched = false;
  filteredCities!: Array<any>;
  citySelect = '';
  showCityNotFound = true;
  loading = false;

  constructor(
    private dataService: AbstractDataService
  ) {
    if (!dataService) {
      throw new Error('dataService is empty');
    }
  }

  @HostListener('focusin')
  onFocus() {
    this.markAsTouched();
  }

  onChange = (value) => { };
  onTouched = () => { };

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledStates(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (this.touched) { return; }

    this.onTouched();
    this.touched = true;
  }

  onCityInputChange(value: string) {
    this.filterText = value;

    if (this.isLessThanValidValue(value)) {
      this.clean();

      return;
    }

    // const searchValue = this.value.toLowerCase();
    this.loadData();

    // this.showCityNotFound = this.filteredCities.length === 0;
    // this.showCityNotFound = false;
    // this.onChange(this.value);
  }

  private loadData() {
    // todo finalize pipe to this.loading = false;
    this.loading = true;
    this.dataService.getFakeData(this.filterText)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.filteredCities = res;
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
    let newValue = city;
    this.value = newValue;
    this.filteredCities = [];
    this.showCityNotFound = false;
    this.onChange(this.value);
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
