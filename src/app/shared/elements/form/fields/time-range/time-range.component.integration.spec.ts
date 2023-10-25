import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  IForm,
  IRangeTime,
} from 'src/app/core/module/interface/search-types.interface';
import { TestUtil } from 'src/app/core/utils/test';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeRangeComponent } from './time-range.component';

describe('SUT(Integration): TimeRangeComponent', () => {
  let sut: TimeRangeComponent;
  let fixture: ComponentFixture<TimeRangeComponent>;
  let form: FormGroup<IForm<IRangeTime>>;
  let sliderElement: MatSlider;
  let sliderThumbElement: MatSliderThumb;

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
    sliderElement = TestUtil.queryComponent(fixture, 'mat-slider');
    sliderThumbElement = TestUtil.queryComponent(
      fixture,
      'mat-slider-visual-thumb'
    );
  });

  it('should create', () => {
    //assert
    expect(sut).toBeTruthy();
  });

  it('should be binding formControl and formGroup', () => {
    // arrange
    const formEl = TestUtil.formGroup(fixture, 'form');
    const startTimeCtrl = TestUtil.formControl(fixture, '#startTime');
    const endTimeCtrl = TestUtil.formControl(fixture, '#endTime');

    //assert
    expect(form).toBe(formEl.form);
    expect(sut.form.controls.startTime).toBe(startTimeCtrl.control);
    expect(sut.form.controls.endTime).toBe(endTimeCtrl.control);
  });

  it('should binding showTickMarks correctly and binding formatTime to displayWith', () => {
    // assert
    expect(sliderElement.displayWith).toBe(sut.formatTime);
    expect(sliderElement.showTickMarks).toBe(false);
  });
});
