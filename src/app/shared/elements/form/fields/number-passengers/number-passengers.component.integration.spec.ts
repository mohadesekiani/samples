import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPassengersComponent } from './number-passengers.component';
import { TestUtil } from 'src/app/core/helpers/something-helpers-test';

describe('NumberPassengersComponent', () => {
  let sut: NumberPassengersComponent;
  let fixture: ComponentFixture<NumberPassengersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberPassengersComponent],
    });
    fixture = TestBed.createComponent(NumberPassengersComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(sut, 'increased');
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should be increased called when click button', () => {
    // assert
    let btnIncr = TestUtil.nativeElement<HTMLButtonElement>(
      fixture,
      '#btnIncr'
    );

    // act
    btnIncr.click();

    // assert
    expect(sut.increased).toHaveBeenCalled();
  });

  it('should be decrees called when click button', () => {
    let btnDecr = TestUtil.nativeElement<HTMLButtonElement>(
      fixture,
      '#btnDecr'
    );
    spyOn(sut, 'decrees');
    btnDecr.click();

    // assert
    expect(sut.decrees).toHaveBeenCalled();
  });

  it('should be test for binding form controls', () => {
    // arrange
    const input = TestUtil.nativeElement(fixture, '#input');
  
    // assert
    expect(input.id).toBe('input');
    expect(input.type).toBe('number');
  });
});
