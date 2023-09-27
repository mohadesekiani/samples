import { BaseControlValueAccessor } from './base-control-value-accessor';

describe('BaseControlValueAccessor', () => {
  let sut = BaseControlValueAccessor;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e:any) => {};
    onTouched: () => {};
  }>({
    onChange: (e:any) => { },
    onTouched: () => { },
  });
  it('should create an instance', () => {
    expect(new BaseControlValueAccessor()).toBeTruthy();
  });
});
