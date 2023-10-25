import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFlightComponent } from './filter-flight.component';
import { FormBuilder } from '@angular/forms';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { of } from 'rxjs';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { IFilterFlight } from 'src/app/core/module/interface/search-types.interface';

fdescribe('SUT: FilterFlightComponent', () => {
  let sut: FilterFlightComponent;
  let fixture: ComponentFixture<FilterFlightComponent>;
  let fb: FormBuilder;
  const fakeCities: ICity[] = [
    {
      id: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
      title: 'Abadan',
      alternateTitle: 'آبادان',
      code: 'ABD',
      type: 'GeographicalLocation',
      subType: 'City',
      cityId: null,
      countryCode: 'IR',
      countryTitle: 'Iran (Islamic Republic of)',
      countryAlternateTitle: 'ايران',
      price: 5,
      class: 'classy',
      time: 300,
    },
    {
      id: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
      title: 'Abadan',
      alternateTitle: 'آبادان',
      code: 'ABD',
      type: 'GeographicalLocation',
      subType: 'City',
      cityId: null,
      countryCode: 'IR',
      countryTitle: 'Iran (Islamic Republic of)',
      countryAlternateTitle: 'ايران',
      price: 10,
      class: 'CommercialGrade',
      time: 1320,
    },
  ];

  // const dataService = jasmine.createSpyObj<AbstractDataService>({
  //   items$: of(fakeCities),
  // });
  const dataService = jasmine.createSpyObj('AbstractDataService', ['getAllFakeData', 'items$']);
  dataService.items$.and.returnValue(of(fakeCities));
  beforeEach(() => {
    fb = new FormBuilder();
    sut = new FilterFlightComponent(fb, dataService);
    sut.ngOnInit();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should initialize form', () => {
    //assert
    console.log(sut.form.value);
    
    expect(sut.form.value).toEqual({
      timeRange: { startTime: 300, endTime: 1320 },
      priceRange: { minPrice: 0, maxPrice: 10 },
      class: null,
      airline: null,
    });
  });
  it('should apply filter correctly', () => {
    //arrange
    dataService.items$ = of(fakeCities);
    fixture.detectChanges();

    // act 
    sut.form.setValue({
      timeRange: { startTime: 300, endTime: 800 },
      priceRange: { minPrice: 3, maxPrice: 7 },
      class: 'classy',
      airline: '',
    });

    sut.applyFilter(sut.form.value as IFilterFlight);
    // assert
    expect(sut.filteredItems).toEqual([
      {
        id: '91262c06-0afb-48a0-abbc-0767a1ad07f7',
        title: 'Abadan',
        alternateTitle: 'آبادان',
        code: 'ABD',
        type: 'GeographicalLocation',
        subType: 'City',
        cityId: null,
        countryCode: 'IR',
        countryTitle: 'Iran (Islamic Republic of)',
        countryAlternateTitle: 'ايران',
        price: 5,
        class: 'classy',
        time: 300,
      },
    ]);
  });
});
