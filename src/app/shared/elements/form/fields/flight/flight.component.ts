import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ABDataService } from 'src/app/core/services/data/abstract-data.service';
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
  value: string = '';
  disabled = false;
  touched = false;
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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  filteredCities: any;
  citySelect: string = '';
  showCityNotFound = true;
  @Input() lable;
  constructor(private dataService: ABDataService) { }

  onCityInputChange(e: Event) {
    if (this.isLessThanValidValue(e)) {
      this.clean();

      return;
    }

    const searchValue = (e.target as HTMLInputElement).value.toLowerCase();
    this.filteredCities = this.dataService
      .getFakedata(searchValue)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.filteredCities = res;
          console.log(res);
        },
        error: (err) => {
          console.log('3');
          console.log(err);
        },
        complete: () => {
          console.log('4');
        },
      });

    this.showCityNotFound = this.filteredCities.length === 0;
    this.showCityNotFound = false;
    this.onChange(this.value);
    this.markAsTouched();
  }

  private clean() {
    this.filteredCities = [];
    this.showCityNotFound = false;

    this.onChange(this.value);
    this.markAsTouched();
  }

  private isLessThanValidValue(e: Event) {
    return (<HTMLInputElement>e.target).value.length < 2;
  }

  optionSelected(city: string) {
    console.log(city);

    let newValue = city;
    this.value = newValue;
    this.filteredCities = [];
    this.showCityNotFound = false;
    this.onChange(this.value);
    this.markAsTouched();
  }
}
