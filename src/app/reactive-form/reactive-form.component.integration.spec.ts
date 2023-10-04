import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbstractDataService } from '../core/services/data/abstract-data.service';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { TestUtil } from '../core/helpers/something-helpers-test';
import { IForm, ISearchFlight } from '../module/search-types.interface';
import { ReactiveFormComponent } from './reactive-form.component';

describe('SUT(Integration): ReactiveFormComponent', () => {
  let sut: ReactiveFormComponent;
  let fixture: ComponentFixture<ReactiveFormComponent>;
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
      declarations: [ReactiveFormComponent],
      providers: [AbstractDataService],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ReactiveFormComponent);
    sut = fixture.componentInstance;
    form = sut.flightForm;
    fixture.detectChanges();
    try {
      
    } catch (error) {
      
    }
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  //FIXME with mr mirzaei
  it('should bind aria-label', () => {
    // arrange
    const radioGroup =TestUtil.querySelector(fixture,'mat-radio-group');
      const ariaLabel = radioGroup.getAttribute('aria-label');
    // act
    fixture.detectChanges();

    // assert
    expect(ariaLabel).toBe('Select an option');
  });
});
