import { FormBuilder } from '@angular/forms';
import { FilterFlightComponent } from './filter-flight.component';

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
      company:null
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
