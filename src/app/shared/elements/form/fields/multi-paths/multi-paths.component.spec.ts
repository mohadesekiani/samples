import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiPathsComponent } from './multi-paths.component';
import { FormBuilder } from '@angular/forms';


describe('SUT: MultiPathComponent', () => {
  let sut: MultiPathsComponent;
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
    sut = new MultiPathsComponent(fb);
    sut.ngOnInit();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });
});