import { ButtonToggleComponent } from './button-toggle.component';
import { TravelTypesEnum } from 'src/app/core/module/enum/travel-types.enum';

fdescribe('SUT: ButtonToggleComponent', () => {
  let sut: ButtonToggleComponent;

  beforeEach(() => {
    sut = new ButtonToggleComponent();

  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be create properly', () => {
    expect(sut.value).toBe(TravelTypesEnum.OneWay)
  });

  it('should be updated The value when change the value', () => {
    // arrange 
    spyOn(sut,'updateValueAndValidity')

    // act 
    sut.onValueChange({title:'someValue',value:'someValue'})

    // assert 
    expect(sut.value).toBe('someValue')
    expect(sut.updateValueAndValidity).toHaveBeenCalledWith(sut.value)
  });

});
