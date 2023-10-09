import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightComponent } from '../shared/elements/form/fields/flight/flight.component';
import { SearchTrainComponent } from './search-train.component';
import { TestUtil } from '../core/utils/test';


describe('SearchTrainComponent', () => {
  let sut: SearchTrainComponent;
  let fixture: ComponentFixture<SearchTrainComponent>;
  let appFlight:FlightComponent;
  let appDatepicker;
  let appPassengers;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule,FormsModule,BrowserModule,RouterTestingModule],
      declarations: [SearchTrainComponent],
      providers: [AbstractDataService],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(SearchTrainComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    appFlight = TestUtil.queryComponent(fixture,'app-flight')
    appDatepicker = TestUtil.queryComponent(fixture,'app-datepicker')
    appPassengers = TestUtil.queryComponent(fixture,'app-passengers')

  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
  // [(ngModel)]="formData.origin"
  it('should bind ngModel to formData.origin', () => {
    let value:string  = 'some_text';
    sut.formData = { origin: value };
    appFlight.value = value;
    fixture.detectChanges()
    expect(appFlight.value).toBe(sut.formData.origin)

  });
});
