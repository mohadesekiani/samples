import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';

import { MatHint, MatLabel } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';

import { DatepickerComponent } from './datepicker.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatIconButton } from '@angular/material/button';
import * as moment from 'moment';
import { TestUtil } from 'src/app/core/utils/test';

xdescribe('SUT(Integration): DatepickerComponent', () => {
  let sut: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let datePicker: MatDatepickerInput<any>;
  let matDatepicker: MatDatepicker<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, NoopAnimationsModule, SharedModule],
      declarations: [DatepickerComponent],
      schemas: [
        // NO_ERRORS_SCHEMA
      ],
    });

    fixture = TestBed.createComponent(DatepickerComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    datePicker = TestUtil.queryElement(
      fixture,
      'input[matInput]',
      MatDatepickerInput
    );
    matDatepicker = TestUtil.queryComponent(fixture, 'mat-datepicker');
    ///
    spyOn(sut, 'dateValueChanged');
    // #1
    // spyOn(sut, 'dateValueChanged').and.callThrough();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be bind label with default value', async () => {
    // arrange
    sut.label = 'some_label';
    sut.value = new Date();
    fixture.detectChanges();
    const label: HTMLElement = TestUtil.nativeElement(fixture, '#label');
    await fixture.whenStable();

    // assert
    var time2 = moment(sut.value).format('YYYY-MM-DD');
    var time1 = moment(datePicker.value).format('YYYY-MM-DD');
    expect(time1).toBe(time2);
    expect(label.innerText).toBe('some_label');
  });

  it('should be bind label with proper value', async () => {
    // arrange
    const payload_value = new Date();
    sut.label = 'some_label';
    fixture.detectChanges();
    await fixture.whenStable();
    const hint: MatHint = TestUtil.directiveElement(fixture, MatHint);
    const input: HTMLInputElement = TestUtil.nativeElement(fixture, '#input');
    // act
    datePicker.dateChange.emit({
      value: payload_value,
    } as MatDatepickerInputEvent<any, any>);
    fixture.detectChanges();

    // assert
    expect(hint.align).toBe('start');
    expect(input.placeholder).toBe('PlaceHolder');
    expect(sut.dateValueChanged).toHaveBeenCalled();
    expect(sut.dateValueChanged).toHaveBeenCalledWith(payload_value);

    // expect(sut.value).toBe(payload_value); !!! #1
  });
  // disabled
  it('should disabled property input', () => {
    // Arrange
    const disabledInput: HTMLInputElement = TestUtil.nativeElement(
      fixture,
      '#input'
    );

    // Assert
    expect(disabledInput.disabled).toBe(false);
  });

  // (click)="picker.open()"
  it('should open datepicker when clicking the input', () => {
    // Arrange
    const inputElement = TestUtil.nativeElement(fixture, '#input');

    // Act
    spyOn(matDatepicker, 'open');
    inputElement.click();
    fixture.detectChanges();

    // Assert
    expect(matDatepicker.open).toHaveBeenCalled();
    expect(matDatepicker.open).toHaveBeenCalledOnceWith();
  });

  // [matDatepicker]="picker"
  it('should bind matDatepicker to picker', () => {
    // Arrange
    const matDatepickerDirective = TestUtil.directiveElement(
      fixture,
      MatDatepicker
    );

    // Act
    fixture.detectChanges();

    // Assert
    expect(matDatepicker).toBeTruthy();
    expect(matDatepickerDirective).toBe(matDatepicker);
  });
});
