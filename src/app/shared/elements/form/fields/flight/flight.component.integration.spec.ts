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

describe('SUT(Integration): FlightComponent', () => {
  let sut: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  let input: HTMLInputElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [FlightComponent],
      providers: [AbstractDataService],
    });
    fixture = TestBed.createComponent(FlightComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    input = TestUtil.nativeElement(fixture, 'input[matInput]')
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be bind label', () => {
    //arrange
    sut.label = 'some_label';
    fixture.detectChanges();
    const label: HTMLElement = TestUtil.nativeElement(fixture, '#label');

    //assert
    expect(label.innerText).toBe('some_label');
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
  it('should call optionSelected when a city option is clicked', async () => {
    // arrange
    spyOn(sut, 'optionSelected');
    sut.filteredCities = ['New York'];
    input.click();
    fixture.detectChanges();

    const autocomplete: MatAutocomplete = TestUtil.queryComponent(fixture, 'mat-autocomplete');
    const cityOption = autocomplete.options.toArray()[0]['_element'].nativeElement;
    const actualValues = autocomplete.options.toArray().map(x => x.value);
    await fixture.whenStable();

    fixture.detectChanges();

    //act
    cityOption.click();
    fixture.detectChanges();
    //assert
    expect(sut.optionSelected).toHaveBeenCalledWith('New York');
    expect(sut.filteredCities).toEqual(actualValues);
  });

  xit('should be bind filterCities to value', () => {
    const cityOption = TestUtil.queryComponent(fixture, 'mat-option');
    sut.filteredCities = ['New York'];
    fixture.detectChanges();

    expect(cityOption.value).toEqual(sut.filteredCities);
  });

  //TODO Coverage 100%
});
