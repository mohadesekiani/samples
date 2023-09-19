import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiPathComponent } from './multi-path.component';
import { FormBuilder } from '@angular/forms';


describe('SUT: MultiPathComponent', () => {
  let sut: MultiPathComponent;
  let fb: FormBuilder;
  const valueAccessor = jasmine.createSpyObj<{
    onChange: (e) => {};
    onTouched: () => {};
  }>({
    onChange: (e) => { },
    onTouched: () => { },
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
});