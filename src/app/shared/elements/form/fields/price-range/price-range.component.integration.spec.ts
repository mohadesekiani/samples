import {
  IForm,
  IRangePrice,
} from 'src/app/core/module/interface/search-types.interface';
import { PriceRangeComponent } from './price-range.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtil } from 'src/app/core/utils/test';
import { MatFormField } from '@angular/material/form-field';

describe('SUT(Integration): PriceRangeComponent', () => {
  let sut: PriceRangeComponent;
  let fixture: ComponentFixture<PriceRangeComponent>;
  let form: FormGroup<IForm<IRangePrice>>;
  let formFieldElement: MatFormField;
  let minPriceInput: HTMLInputElement;
  let maxPriceInput: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        SharedModule,
      ],
      declarations: [PriceRangeComponent],
    });
    fixture = TestBed.createComponent(PriceRangeComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    form = sut.form;
    formFieldElement = TestUtil.queryComponent(fixture, 'mat-form-field');
    minPriceInput = TestUtil.nativeElement(fixture, '#minPrice');
    maxPriceInput = TestUtil.nativeElement(fixture, '#maxPrice');
  });

  it('should be create', () => {
    //assert
    expect(sut).toBeTruthy();
    expect(minPriceInput).toBeTruthy();
    expect(maxPriceInput).toBeTruthy();
  });

  it('should be binding formControl and formGroup', () => {
    // arrange
    const formGroupDirective = TestUtil.formGroup(fixture, 'form');
    const minPriceCtrl = TestUtil.formControl(fixture, '#minPrice');
    const maxPriceCtrl = TestUtil.formControl(fixture, '#maxPrice');

    //assert
    expect(form).toBe(formGroupDirective.form);
    expect(sut.form.controls.minPrice).toBe(minPriceCtrl.control);
    expect(sut.form.controls.maxPrice).toBe(maxPriceCtrl.control);
  });

  it('should be binding appearance,placeholder ', () => {
    // assert 
    expect(formFieldElement.appearance).toBe('fill');
    expect(minPriceInput.placeholder).toBe('example: 10000');
    expect(maxPriceInput.placeholder).toBe('example: 50000');
  });
});
