import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { FlightComponent } from './flight.component';

fdescribe('SUT: FlightComponent', () => {
  let sut: FlightComponent;
  let dataService = {} as AbstractDataService;
  const valueAccessor = jasmine.createSpyObj({
    onChange: () => { }
  });

  beforeEach(() => {
    sut = new FlightComponent(dataService);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be throw exception with null dataService', () => {
    // assert
    expect(() => new FlightComponent(null as any)).toThrowError('dataService is empty');
  });

  it('should be set #value when onCityInputChange called with proper value', () => {
    // act
    sut.onCityInputChange('some_text');

    // assert
    expect(sut.filterText).toBe('some_text');
  });

  it('should set onChange with proper value when registerOnChange called', () => {
    // act
    sut.registerOnChange(valueAccessor.onChange);

    // assert
    expect(sut.onChange).toBe(valueAccessor.onChange);
    // todo test markAsTouched 
  });

  it('should be clean variables related with value when value is less than 2', () => {
    // arrange
    sut.filteredCities = ['some_city'];
    sut.showCityNotFound = true;
    sut.value = 'some_city';
    sut.registerOnChange(valueAccessor.onChange);

    // act
    sut.onCityInputChange('s');

    // assert
    expect(sut).toEqual(jasmine.objectContaining({
      filteredCities: [],
      showCityNotFound: false,
      value: null
    }));
    expect(valueAccessor.onChange).toHaveBeenCalled();
    expect(valueAccessor.onChange).toHaveBeenCalledWith(null);
  });
});
