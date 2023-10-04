import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiPathComponent } from './multi-path.component';
import { FormBuilder } from '@angular/forms';
import { TravelTypesEnum } from 'src/app/module/travel-types.enum';

describe('SUT: MultiPathComponent', () => {
  let sut: MultiPathComponent;
  let fb: FormBuilder;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e: any) => {};
    onTouched: () => {};
  }>({
    onChange: (e: any) => {},
    onTouched: () => {},
  });
  beforeEach(() => {
    fb = new FormBuilder();
    sut = new MultiPathComponent(fb);
    sut.ngOnInit();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should be created form with default value', () => {
    // arrange
    const expectedFormValue = {
      routes: [
        {
          origin: null,
          destination: null,
          departureDate: null,
        },
      ],
    };
    // assert
    expect(sut.form.value).toEqual(expectedFormValue);
    // TODO اگه تراول تایپش رواندتریپ بود ریترن دیت باشد
  });

  it('should be when selected MultiPath length formArray to be two', () => {
    //arrange
    // sut.form.controls.travelType.setValue(TravelTypesEnum.OneWay);

    // act
    // sut.form.controls.travelType.setValue(TravelTypesEnum.MultiPath);

    // assert
    expect(sut.form.controls.routes.length).toBe(2);
  });

  it('should be when called addNewRow pushed to formArray ', () => {
    //arrange
    // sut.form.controls.travelType.setValue(TravelTypesEnum.OneWay);

    // act
    // sut.form.controls.travelType.setValue(TravelTypesEnum.MultiPath);
    sut.addNewRow();

    // assert
    expect(sut.form.controls.routes.length).toBe(3);
  });

  it('should enable routes when _travelType is MultiPath', () => {
    // arrange
    sut.travelType = TravelTypesEnum.MultiPath;

    // act
    sut.addNewRow();
    sut.ngOnChanges(TravelTypesEnum.MultiPath);
    sut.prepareMultiPathControlsState();
    sut.isMultiPath();

    // assert
    expect(sut.isMultiPath()).toBe(true);
    for (let i = 0; i < sut.routes.controls.length; i++) {
      expect(sut.routeIsActive(i)).toBe(true);
    }
  });

  // it('should disable routes when _travelType is not MultiPath', () => {
  //   //arrange
  //   // sut.form.controls.travelType.setValue(TravelTypesEnum.OneWay);

  //   // assert
  //   expect(sut.routeIsActive(0)).toBe(true);
  //   expect(sut.routeIsActive(1)).toBe(false);
  // });
});
