import { of } from 'rxjs';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { FlightComponent } from './flight.component';

describe('SUT: FlightComponent', () => {
  let sut: FlightComponent;
  const fakeCities = ['city1', 'city2'];
  const dataService = jasmine.createSpyObj<AbstractDataService>({
    getFakedata: of(fakeCities)
  });
  const valueAccessor = jasmine.createSpyObj({
    onChange: () => { },
    onTouched:() => {},

  });

  beforeEach(() => {
    sut = new FlightComponent(dataService);
    sut.registerOnChange(valueAccessor.onChange);
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
    //arreng
    const onTouchedSpy = spyOn(sut, 'onTouched');

    // act
    sut.registerOnChange(valueAccessor.onChange);
    sut.markAsTouched();

    // assert
    // todo test markAsTouched
    expect(sut.onChange).toBe(valueAccessor.onChange);
    //?valueAccessor.onTouched
    expect(onTouchedSpy).toHaveBeenCalled();
    expect(sut.touched).toBe(true);


  });

  it('should be clean variables related with value when value is less than 2', () => {
    // arrange
    sut.filteredCities = ['some_city'];
    sut.showCityNotFound = true;
    sut.value = 'some_city';
    sut.registerOnChange(valueAccessor.onChange);
    sut.registerOnTouched(valueAccessor.onTouched)

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
    // TODO onTocuh
    expect(valueAccessor.onTouched).toHaveBeenCalled();


  });

  it('should call dataService.getFakedata and set filteredCities properly ', () => {
    // arrange
    sut.loading = true
    sut.filteredCities = [];

    // act
    sut.onCityInputChange('cit');

    // assert
    expect(dataService.getFakedata).toHaveBeenCalledWith('cit');
    expect(sut.filteredCities).toEqual(fakeCities);
    expect(sut.loading).toBe(false)
  });

  //TODO Coverage 100%

});
