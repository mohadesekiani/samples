import { of } from 'rxjs';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { FlightComponent } from './flight.component';

// spy of sut methods in unit tests is not valid

describe('SUT: FlightComponent', () => {
  let sut: FlightComponent;
  const fakeCities = ['city1', 'city2'];
  const dataService = jasmine.createSpyObj<AbstractDataService>({
    getFakeData: of(fakeCities),
  });
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e) => {};
    onTouched: () => {};
  }>({
    onChange: (e) => {},
    onTouched: () => {},
  });

  beforeEach(() => {
    sut = new FlightComponent(dataService);
    sut.registerOnChange(valueAccessor.onChange);
    sut.registerOnTouched(valueAccessor.onTouched);
    sut.setDisabledStates(false);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be throw exception with null dataService', () => {
    // assert
    expect(() => new FlightComponent(null as any)).toThrowError(
      'dataService is empty'
    );
  });

  it('should be set #value when onCityInputChange called with proper value', () => {
    // act
    sut.onCityInputChange('some_text');

    // assert
    expect(sut.filterText).toBe('some_text');
  });

  it('should set ControlValueAccessor methods when constructor called', () => {
    // assert
    expect(sut.onTouched).toBe(valueAccessor.onTouched);
    expect(sut.onChange).toBe(valueAccessor.onChange);
    expect(sut.disabled).toBe(false);
  });

  it('should set onChange with proper value when registerOnChange called', () => {
    // act
    sut.onChange(null);

    // assert
    expect(valueAccessor.onChange).toHaveBeenCalled();
  });

  it('should set onTouched when markAsTouched called', () => {
    // act
    sut.markAsTouched();

    // assert
    expect(valueAccessor.onTouched).toHaveBeenCalled();
    expect(sut.touched).toBe(true);
  });

  it('should be clean variables related with value when value is less than 2', () => {
    // arrange
    sut.filteredCities = ['some_city'];
    sut.showCityNotFound = true;
    sut.value = 'some_city';

    // act
    sut.onCityInputChange('s');

    // assert
    expect(sut).toEqual(
      jasmine.objectContaining({
        filteredCities: [],
        showCityNotFound: false,
        value: null,
      })
    );
    expect(valueAccessor.onChange).toHaveBeenCalled();
    expect(valueAccessor.onChange).toHaveBeenCalledWith(null);
    expect(valueAccessor.onTouched).toHaveBeenCalled();
  });

  it('should call dataService.getFakeData and set filteredCities properly ', () => {
    // arrange
    sut.loading = true;
    sut.filteredCities = [];

    // act
    sut.onCityInputChange('cit');

    // assert
    expect(dataService.getFakeData).toHaveBeenCalledWith('cit');
    expect(sut.filteredCities).toEqual(fakeCities);
    expect(sut.loading).toBe(false);
  });

});
