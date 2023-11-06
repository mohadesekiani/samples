import { FormBuilder } from '@angular/forms';
import { SearchTrainComponent } from 'src/app/search-train/search-train.component';
import { TravelTypesEnum } from '../../module/enum/travel-types.enum';

export class TestInitialize {
  static initializeTest(
    sut: any,
    formFields: Record<string, any>,
    path: string
  ) {
    let fb = new FormBuilder();
    sut.form = fb.group(formFields);
    sut.path = path;
    sut.ngOnInit();
  }
  static unitTestInitialize(
    sut: any,
    formFields: Record<string, any>,
    path: string
  ) {
    beforeEach(() => {      
      TestInitialize.initializeTest(sut, formFields, path);
    });
    it('should be have similar behavior for different components', () => {
      // assert
      expect(sut).toBeTruthy();
      expect(sut.path).toBe(path);
    });
  }
  static initializeEnum(
    actual: any[],
    expected: Record<string, any>[],
    name: string
  ) {
    it(`should be create initialize enum ${name}`, () => {
      // assert
      expect(actual).toEqual(expected);
    });
  }
  static validForm(
    sut: any,
    router: any,
    formValue: Record<string, any>,
    path: string
  ) {
    it(`should be when submit routing to ${path} with condition valid form `, () => {
      // arrange
      sut.path = path;
      sut.form.setValue(formValue);

      // act
      sut.submit();

      // assert
      expect(router).toHaveBeenCalledWith([path]);
    });
  }
  static initializeForm(sut: any, formFields: Record<string, any>) {
    it('should be set initialization form', () => {
      // assert
      expect(sut.form.value).toEqual(formFields);
    });
  }
  static invalidForm(sut: any, changeValue: Record<string, any>) {
    it('should be check form is invalid ', () => {
      // arrange
      spyOn(sut.form, 'markAllAsTouched');
      spyOn(sut.form, 'markAsDirty');
      sut.form.patchValue(changeValue);

      // act
      sut.submit();

      // assert
      expect(sut.form.markAllAsTouched).toHaveBeenCalled();
      expect(sut.form.markAsDirty).toHaveBeenCalled();
    });
  }
}
