import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { IFilterFlight } from 'src/app/core/module/interface/search-types.interface';
import { FilterFlightComponent } from './filter-flight.component';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { fakeAsync, tick } from '@angular/core/testing';

fdescribe('SUT: FilterFlightComponent', () => {
  let sut: FilterFlightComponent;
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
    sut = new FilterFlightComponent(fb);
    sut.ngOnInit();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should initialize form', () => {
    //assert
    expect(sut.form.value).toEqual({
      timeRange: { startTime: 300, endTime: 1320 },
      priceRange: { minPrice: 0, maxPrice: 10 },
      class: null,
      airline: null,
    });
  });

  it('should emit value on form value changes', (done) => {
    // arrange
    spyOn(sut.newItemEvent, 'emit');

    // act
    sut.form.patchValue({
      timeRange: { startTime: 600, endTime: 1320 },
    });

    // assert
    setTimeout(() => {
      expect(sut.form.valid).toBeTruthy();
      expect(sut.newItemEvent.emit).toHaveBeenCalled();
      expect(sut.newItemEvent.emit).toHaveBeenCalledWith(sut.getFormValue);
      done();
    }, 300);
  });
});
