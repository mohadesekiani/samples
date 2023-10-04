import { BaseInputControlValueAccessor } from "./base-input-control-value-accessor";

describe('BaseInputControlValueAccessor', () => {
  let sut = BaseInputControlValueAccessor;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e:any) => {};
    onTouched: () => {};
  }>({
    onChange: (e:any) => { },
    onTouched: () => { },
  });
  it('should create an instance', () => {
    // expect(new BaseInputControlValueAccessor()).toBeTruthy();
  });
});
