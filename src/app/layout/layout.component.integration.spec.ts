import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';
import { AbstractDataService } from '../core/services/data/abstract-data.service';
import { SharedModule } from '../shared/shared.module';

describe('LayoutComponent', () => {
  let sut: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule,FormsModule,BrowserModule,RouterTestingModule],
      declarations: [LayoutComponent],
      providers: [AbstractDataService],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(LayoutComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
