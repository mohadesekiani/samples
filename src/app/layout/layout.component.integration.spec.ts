import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';
import { AbstractDataService } from '../core/services/data/abstract-data.service';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { TestUtil } from '../core/utils/test/test-util';

describe('LayoutComponent', () => {
  let sut: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        FormsModule,
        BrowserModule,
        RouterTestingModule,
      ],
      declarations: [LayoutComponent],
      providers: [AbstractDataService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(LayoutComponent);
    router = TestBed.inject(Router);

    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });

  it('should activate tab on click', () => {
    // arrange
    let tabActiveElement = TestUtil.nativeElement(fixture, '#Train');

    // act
    tabActiveElement.click();
    fixture.detectChanges();

    // assert
    expect(sut.tabs[0].active).toBe(false);
    expect(sut.tabs[1].active).toBe(true);
  });
});
