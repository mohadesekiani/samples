import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  IForm,
  IRangeTime,
} from 'src/app/core/module/interface/search-types.interface';
import { TestUtil } from 'src/app/core/utils/test';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeRangeComponent } from './time-range.component';

fdescribe('SUT(Integration): TimeRangeComponent', () => {
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

  it('should be binding formControl', () => {
    // arrange
    const startTimeCtrl = TestUtil.formControl(fixture, '#startTime');
    const endTimeCtrl = TestUtil.formControl(fixture, '#endTime');

    //assert
    expect(sut.form.controls.startTime).toBe(startTimeCtrl.control);
    expect(sut.form.controls.endTime).toBe(endTimeCtrl.control);
  });

  // matDatepicker = TestUtil.queryComponent(fixture, 'mat-datepicker');
});
