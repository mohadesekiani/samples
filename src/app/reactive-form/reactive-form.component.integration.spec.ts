import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormComponent } from './reactive-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbstractDataService } from '../core/services/data/abstract-data.service';
import { AppComponent } from '../app.component';
import { TestUtil } from '../core/helpers/somtingHelpersTest';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';


describe('ReactiveFormComponent', () => {
  let sut: ReactiveFormComponent;
  let fixture: ComponentFixture<ReactiveFormComponent>;
  let appFlight;
  let appDatepicker;
  let appPassengers;
  let matRadioGroup: MatRadioGroup
  let matRadioButton: MatRadioButton
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
        RouterModule
      ],
      declarations: [
        ReactiveFormComponent
      ],
      providers:[
        AbstractDataService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(ReactiveFormComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    appFlight = TestUtil.queryComponent(fixture,'app-flight')
    appDatepicker = TestUtil.queryComponent(fixture,'app-datepicker')
    appPassengers = TestUtil.queryComponent(fixture,'app-passengers')
    matRadioGroup = TestUtil.directiveElement(fixture, MatRadioGroup);
    matRadioButton = TestUtil.directiveElement(fixture, MatRadioButton);

  });


  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
