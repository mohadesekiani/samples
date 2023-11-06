import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightComponent } from '../shared/elements/form/fields/flight/flight.component';
import { SearchTrainComponent } from './search-train.component';
import { TestUtil } from '../core/utils/test';
import { MultiPathComponent } from '../shared/elements/form/fields/multi-path/multi-path.component';
import { PassengersComponent } from '../shared/elements/form/fields/passengers/passengers.component';
import {
  TravelTrainTypesEnum,
  TravelTypesEnum,
} from '../core/module/enum/travel-types.enum';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

fdescribe('SUT(Integration): SearchTrainComponent', () => {
  let sut: SearchTrainComponent;
  let fixture: ComponentFixture<SearchTrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        FormsModule,
        BrowserModule,
        RouterTestingModule,
      ],
      declarations: [SearchTrainComponent],
      providers: [AbstractDataService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(SearchTrainComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should be binding formControlName', () => {
    // arrange
    const formEl = TestUtil.formGroup(fixture, 'form');
    const routeCtrl = TestUtil.formControl(fixture, '#route');
    const travelTypeCtrl = TestUtil.formControl(fixture, '#travelType');
    const passengersCtrl = TestUtil.formControl(fixture, '#passengers');

    // const generalCtrl = TestUtil.formControl(fixture, '#general');

    // assert
    expect(sut.form).toBe(formEl.form);
    expect(sut.form.controls.route).toBe(routeCtrl.control);
    expect(sut.form.controls.travelType).toBe(travelTypeCtrl.control);
    expect(sut.form.controls.passengers).toBe(passengersCtrl.control);

    // expect(sut.form.controls.general).toBe(generalCtrl.control);
  });

  it('should be binding  value', () => {
    // arrange
    sut.showDrop = false;
    const buttonToggles = TestUtil.directiveAllElement(
      fixture,
      MatButtonToggle
    );
    const radio = TestUtil.directiveAllElement(fixture, MatRadioGroup);
    const buttonElement = TestUtil.nativeElement<HTMLInputElement>(
      fixture,
      '#button'
    );
    const showDropElement = TestUtil.nativeElement(fixture, '#showDrop');

    const radioButtons = TestUtil.queryAllElement(fixture, '#general');
    // const input = TestUtil.nativeElement<HTMLInputElement>(fixture, '#general');

    // act
    spyOn(sut, 'submit');
    buttonElement.click();
    showDropElement.click();
    fixture.detectChanges();
    console.log(radio);

    // assert
    expect(buttonToggles.length).toBe(sut.travelTypes.length);
    buttonToggles.forEach((buttonToggle, index) => {
      expect(buttonToggle.componentInstance.value).toBe(
        sut.travelTypes[index].value
      );
    });
    expect(sut.submit).toHaveBeenCalled();
    expect(sut.showDrop).toBeTruthy();
    expect(buttonElement.type).toBe('submit');
    // expect(input.type).toBe('radio');
  });

});
