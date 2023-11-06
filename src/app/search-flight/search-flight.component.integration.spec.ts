import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFlightComponent } from './search-flight.component';
import {
  IForm,
  ISearchFlight,
} from '../core/module/interface/search-types.interface';
import { FormGroup, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AbstractDataService } from '../core/services/data/abstract-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestUtil } from '../core/utils/test';
import { MatButtonToggle } from '@angular/material/button-toggle';

fdescribe('SUT(Integration): SearchFlightComponent', () => {
  let sut: SearchFlightComponent;
  let fixture: ComponentFixture<SearchFlightComponent>;
  let form: FormGroup<IForm<ISearchFlight>>;
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
      declarations: [SearchFlightComponent],
      providers: [AbstractDataService],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(SearchFlightComponent);
    sut = fixture.componentInstance;
    form = sut.form;
    fixture.detectChanges();
    try {
    } catch (error) {}
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be binding formControlName', () => {
    // arrange
    const formEl = TestUtil.formGroup(fixture, 'form');
    const routesCtrl = TestUtil.formControl(fixture, '#routes');
    const travelTypeCtrl = TestUtil.formControl(fixture, '#travelType');
    const passengersCtrl = TestUtil.formControl(fixture, '#passengers');
    const classCtrl = TestUtil.formControl(fixture, '#class');

    // assert
    expect(sut.form).toBe(formEl.form);
    expect(sut.form.controls.routes).toBe(routesCtrl.control);
    expect(sut.form.controls.travelType).toBe(travelTypeCtrl.control);
    expect(sut.form.controls.passengers).toBe(passengersCtrl.control);
    expect(sut.form.controls.classType).toBe(classCtrl.control);
  });

  it('should bind aria-label', () => {
    // arrange
    const buttonToggles = TestUtil.directiveAllElement(
      fixture,
      MatButtonToggle
    );
    const ariaLabel = TestUtil.querySelector(
      fixture,
      'mat-radio-group'
    ).getAttribute('aria-label');
    const buttonElement = TestUtil.nativeElement<HTMLInputElement>(
      fixture,
      '#button'
    );

    // act
    buttonElement.click();
    fixture.detectChanges();

    // assert
    expect(buttonToggles.length).toBe(sut.travelTypes.length);
    buttonToggles.forEach((buttonToggle, index) => {
      expect(buttonToggle.componentInstance.value).toBe(
        sut.travelTypes[index].value
      );
    });
    expect(ariaLabel).toBe('Select an option');
    expect(sut.submit).toHaveBeenCalled();
    expect(buttonElement.type).toBe('submit');
  });
});
