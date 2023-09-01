import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FlightComponent } from './flight.component';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';
import { Input } from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteOrigin,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

fdescribe('SUT(Integration): FlightComponent', () => {
  let sut: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [FlightComponent],
      providers: [AbstractDataService],
    });
    fixture = TestBed.createComponent(FlightComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be bind lable', () => {
    //arrange
    sut.label = 'some_lable';
    fixture.detectChanges();
    const label: HTMLElement = TestUtil.nativeElement(fixture, '#label');

    //assert
    expect(label.innerText).toBe('some_lable');
  });
  it('should be bind placeholder', () => {
    //arrange
    const input: HTMLInputElement = TestUtil.nativeElement(fixture, '#input');

    //assert
    expect(input.placeholder).toBe('select');
    expect(input.type).toBe('text');
  });

  it('should bind matAutocomplete to auto', () => {
    //arrange
    const matAutocompleteDirective = TestUtil.directiveElement(
      fixture,
      MatAutocomplete
    );
    const matAutocomplete = TestUtil.queryComponent(
      fixture,
      'mat-autocomplete'
    );

    //act
    fixture.detectChanges();

    //assert
    expect(matAutocomplete).toBeTruthy();
    expect(matAutocompleteDirective).toBe(matAutocomplete);
  });
  // (ngModelChange)="onCityInputChange($event)"
  it('should be bind onCityInputChange', () => {
    //arrange
    spyOn(sut, 'onCityInputChange');
    const change_value = 'City1';
    const input = TestUtil.nativeElement(fixture, 'input[matInput]');

    //act
    input.value = change_value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    //assert
    expect(sut.onCityInputChange).toHaveBeenCalled();
    expect(sut.onCityInputChange).toHaveBeenCalledWith(change_value);
  });
  // [ngModel]="value"
  it('should bind input with value', () => {
    //arrange
    const input = TestUtil.nativeElement(fixture, 'input[matInput]');
    const value = 'city1';
    input.value = value;
    sut.value = value;

    //act
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    //assert
    expect(input.value).toBe(sut.value);
  });
  // // (click)="optionSelected(city)"
  // it('should call optionSelected when a city option is clicked', () => {
  //   // arrange
  //   sut.filteredCities = ['New York'];
  //   spyOn(sut, 'optionSelected');
  //   const cityOption = TestUtil.queryComponent(fixture, 'mat-option');
  //   fixture.detectChanges();
  //   if (cityOption) {
  //     //act
  //     cityOption.click();
  //     fixture.detectChanges();
  //     //assert
  //     expect(sut.optionSelected).toHaveBeenCalledWith('New York');
  //   }
  // });

  fit('should be bind filtercities to value', () => {
    const cityOption = TestUtil.queryComponent(fixture, 'mat-option');
    sut.filteredCities = ['New York'];
    fixture.detectChanges();

    expect(cityOption.value).toEqual(sut.filteredCities);
  });
  //TODO Coverage 100%
});
