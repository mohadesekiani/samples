import { BaseFormControlValueAccessor } from "./base-form-control-value-accessor";

describe('BaseFormControlValueAccessor', () => {
  let sut = BaseFormControlValueAccessor;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e:any) => {};
    onTouched: () => {};
  }>({
    onChange: (e:any) => { },
    onTouched: () => { },
  });
  it('should create an instance', () => {
    // expect(new BaseFormControlValueAccessor()).toBeTruthy();
  });
});
