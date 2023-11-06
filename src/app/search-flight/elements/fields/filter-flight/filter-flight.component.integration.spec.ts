import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterFlightComponent } from './filter-flight.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  IFilterFlight,
  IForm,
} from 'src/app/core/module/interface/search-types.interface';
import { TestUtil } from 'src/app/core/utils/test';

xdescribe('SUT(Integration): FilterFlightComponent', () => {
  let sut: FilterFlightComponent;
  let fixture: ComponentFixture<FilterFlightComponent>;
  let form: FormGroup<IForm<IFilterFlight>>;
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
      declarations: [FilterFlightComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(FilterFlightComponent);
    sut = fixture.componentInstance;
    form = sut.form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be binding formGroup', () => {
    const formGroupDirective = TestUtil.formGroup(fixture, 'form');
    expect(form).toBe(formGroupDirective.form);
  });
  
});
