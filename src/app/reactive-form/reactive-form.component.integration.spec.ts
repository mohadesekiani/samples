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
  let matRadioGroup: MatRadioGroup;
  let matRadioButton: MatRadioButton;
  let originInput;
  let destination;
  let departureDate;
  let returnDate;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
        RouterModule,
      ],
      declarations: [ReactiveFormComponent],
      providers: [AbstractDataService],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ReactiveFormComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    // appFlight = TestUtil.queryComponent(fixture,'app-flight')
    originInput = TestUtil.querySelector(
      fixture,
      'app-flight[formControlName="origin"]'
    );
    destination = TestUtil.querySelector(
      fixture,
      'app-flight[formControlName="destination"]'
    );
    departureDate =TestUtil.querySelector(
      fixture,
      'app-datepicker[formControlName="departureDate"]'
    );
    returnDate =TestUtil.querySelector(
      fixture,
      'app-datepicker[formControlName="returnDate"]'
    );
    // appPassengers = TestUtil.queryComponent(fixture, 'app-passengers');
    matRadioGroup = TestUtil.directiveElement(fixture, MatRadioGroup);
    matRadioButton = TestUtil.directiveElement(fixture, MatRadioButton);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  // label="origin"
  it('should binding label', () => {    
    // arrange
    originInput.label = 'some_Text';
    // act
    fixture.detectChanges();
    // assert
    expect(originInput.label).toBe('some_Text');
  });

  it('should binding label ', () => {
    // arrange
    destination.label = 'some_Text';
    // act
    fixture.detectChanges();
    // assert
    expect(destination.label).toBe('some_Text');
  });

  it('should bind label', () => {
    // arrange
    departureDate.label = 'some_Text';
    // act
    fixture.detectChanges();
    // assert
    expect(departureDate.label).toBe('some_Text');
  });

  it('should bind placeholder', () => {
    // arrange
    departureDate.placeholder = 'some_Text';
    // act
    fixture.detectChanges();
    // assert
    expect(departureDate.placeholder).toBe('some_Text');
  });

  it('should bind label', () => {
    // arrange
    returnDate.label = 'some_Text';
    // act
    fixture.detectChanges();
    // assert
    expect(returnDate.label).toBe('some_Text');
  });

  it('should bind placeholder', () => {
    // arrange
    returnDate.placeholder = 'some_Text';
    // act
    fixture.detectChanges();
    // assert
    expect(returnDate.placeholder).toBe('some_Text');
  });

  it('should bind aria-label', () => {
    // arrange
    const radioGroup = fixture.debugElement.nativeElement.querySelector('mat-radio-group');
    const ariaLabel = radioGroup.getAttribute('aria-label') 
    // act
    fixture.detectChanges();
    // assert
    expect(ariaLabel).toBe('Select an option');
  });



});
