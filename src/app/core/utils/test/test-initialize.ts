import { FormBuilder } from '@angular/forms';
import { BaseForm } from '../../constant/base-component/base-form';

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
    it('should be create properly', () => {
      // assert
      expect(sut).toBeTruthy();
      expect(sut.path).toBe(path);
    });
  }
  static ShouldBeSetWithProperValueWhenConstructorCalled(
    actual: any[],
    expected: Record<string, any>[],
    name: string
  ) {
    it(`should be set ${name} with proper value when constructor called`, () => {
      // assert
      expect(actual).toEqual(expected);
    });
  }
  static validFormTests<T extends BaseForm<any>>(
    sut: T,
    router: any,
    formValue: Record<string, any>,
    path: string
  ) {
    it(`should be when submit routing to ${path} with condition valid form `, () => {
      // arrange
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
  static invalidForm(sut: BaseForm<any>, changeValue: Record<string, any>) {
    it('should be check form is invalid ', () => {
      // arrange
      sut.form.patchValue(changeValue);
      sut.form.markAsPristine();

      // act
      sut.submit();

      // assert
      expect(sut.form.dirty).toBeTrue();
      expect(sut.form.touched).toBeTrue();
    });
  }
}
