import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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

describe('SUT(Integration): TimeRangeComponent', () => {
  let sut: TimeRangeComponent;
  let fixture: ComponentFixture<TimeRangeComponent>;
  let form: FormGroup<IForm<IRangeTime>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        SharedModule,
      ],
      declarations: [TimeRangeComponent],
    });
    fixture = TestBed.createComponent(TimeRangeComponent);
    sut = fixture.componentInstance;
    
    fixture.detectChanges();
    form = sut.form;
  });

  it('should create', () => {
    //assert
    expect(sut).toBeTruthy();
  });

  it('should be binding formGroup', () => {
    // arrange
    const formGroupDirective = TestUtil.formGroup(fixture, 'form');

    //assert
    expect(form).toBe(formGroupDirective.form);
  });
});
