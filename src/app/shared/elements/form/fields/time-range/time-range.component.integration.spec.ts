import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ValidatorFn,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  IFilterFlight,
  IForm,
  IRangeTime,
} from 'src/app/core/module/interface/search-types.interface';
import { TestUtil } from 'src/app/core/utils/test';
import { TimeRangeComponent } from './time-range.component';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';


class MockFormControlValueAccessor extends BaseFormControlValueAccessor<
  IForm<IRangeTime>
> {}


describe('SUT(Integration): TimeRangeComponent', () => {
  let sut: TimeRangeComponent;
  let fixture: ComponentFixture<TimeRangeComponent>;
  let form: FormGroup<IForm<IRangeTime>>;
  let baseFormControlValueAccessor: MockFormControlValueAccessor;
  let fb: FormBuilder;
  let validationErrorService: ValidationErrorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
        RouterModule,
      ],
      declarations: [TimeRangeComponent],
      providers: [BaseFormControlValueAccessor],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TimeRangeComponent);
    sut = fixture.componentInstance;
    baseFormControlValueAccessor = new MockFormControlValueAccessor(
      fb,
      validationErrorService
    );
    baseFormControlValueAccessor.ngOnInit();
    form = sut.form;

    fixture.detectChanges();
  });

  it('should create', () => {
    //assert
    expect(sut).toBeTruthy();
  });

  xit('should be binding formGroup', () => {
    // arrange
    const formGroupDirective = TestUtil.formGroup(fixture, 'form');

    //assert
    expect(form).toBe(formGroupDirective.form);
  });
});
