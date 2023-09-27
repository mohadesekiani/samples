import { SharedModule } from 'src/app/shared/shared.module';
import { MultiPathComponent } from './multi-path.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelTypesEnum } from 'src/app/models/travel-types.enum';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { FlightComponent } from '../flight/flight.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { TestUtil } from 'src/app/core/helpers/something-helpers-test';

describe('SUT(Integration): MultiPathComponent', () => {
  let sut: MultiPathComponent;
  let fixture: ComponentFixture<MultiPathComponent>;
  let originInput: FlightComponent;
  let destinationInput: FlightComponent;
  let departureDateInput: any;
  let returnDateInput: any;
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
      declarations: [MultiPathComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AbstractDataService],
    });
    fixture = TestBed.createComponent(MultiPathComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    originInput = TestUtil.querySelector(
      fixture,
      'app-flight[formControlName="origin"]'
    );
    destinationInput = TestUtil.querySelector(
      fixture,
      'app-flight[formControlName="destination"]'
    );
    departureDateInput = TestUtil.querySelector(
      fixture,
      'app-datepicker[formControlName="departureDate"]'
    );
    returnDateInput = TestUtil.querySelector(
      fixture,
      'app-datepicker[formControlName="returnDate"]'
    );
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should test the presence of the form', () => {
    expect(sut.form).toBeTruthy();
  });

  it('should binding label', () => {
    // arrange
    const someText = 'some_Text';
    originInput.label = someText;
    destinationInput.label = someText;
    departureDateInput.label = someText;
    fixture.detectChanges();

    // assert
    expect(originInput.label).toBe(someText);
    expect(destinationInput.label).toBe(someText);
    expect(departureDateInput.label).toBe(someText);
  });

  it('should binding placeholder', () => {
    // arrange
    const someText = 'some_Text';
    departureDateInput['placeholder'] = someText;

    // assert
    expect(departureDateInput['placeholder']).toBe(someText);
  });

  it('should be test for binding form controls', () => {
    // arrange
    const index: number = 0;
    sut.routeIsActive(index);
    // sut.form.controls.travelType.setValue(TravelTypesEnum.RoundTrip);
    fixture.detectChanges();
    const travelTypeCtrl = TestUtil.formControl(fixture, '[id = travelType]');
    const routesCtrl = TestUtil.formArray(fixture, '[id = routes]');
    const originCtrl = TestUtil.formControl(fixture, '[id = origin]');
    const destinationCtrl = TestUtil.formControl(fixture, '[id = destination]');
    const departureDateCtrl = TestUtil.formControl(
      fixture,
      '[id = departureDate]'
    );
    const returnDateCtrl = TestUtil.formControl(fixture, '[id = returnDate]');

    //assert
    // expect(sut.form.controls.travelType).toBe(travelTypeCtrl.control);
    expect(sut.routes.value).toBe(routesCtrl.value);
    expect(sut.routes.controls).toEqual(routesCtrl.control.controls);
    expect(sut.form.controls.routes.at(index).controls.origin).toBe(
      originCtrl.control
    );
    expect(sut.form.controls.routes.at(index).controls.destination).toBe(
      destinationCtrl.control
    );
    expect(sut.form.controls.routes.at(index).controls.departureDate).toBe(
      departureDateCtrl.control
    );
    expect(sut.form.controls.routes.at(0).controls.returnDate).toBe(
      returnDateCtrl.control
    );
  });
});
