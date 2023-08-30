import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FlightComponent } from './flight.component';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';
import { Input } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('SUT(Integration): FlightComponent', () => {
  let sut: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule
      ],
      declarations: [FlightComponent],
      providers: [
        AbstractDataService
      ]

    });
    fixture = TestBed.createComponent(FlightComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });


  it('should be bind lable', () => {
    //arrange
    sut.label = 'some_lable';
    fixture.detectChanges();
    const label: HTMLElement = TestUtil.nativeElement(fixture, '#label');

    //assert
    expect(label.innerText).toBe('some_lable')
  })
  it('should be bind placeholder', () => {
    //arrange
    const input: HTMLInputElement = TestUtil.nativeElement(fixture, '#input');

    //assert
    expect(input.placeholder).toBe('select')
    expect(input.type).toBe('text')
  });

  it('should bind matAutocomplete to auto', () => {
    //arrange
    const matAutocompleteDirective = TestUtil.directiveElement(fixture, MatAutocomplete)
    const matAutocomplete = TestUtil.queryComponent(fixture, 'mat-autocomplete');

    //act
    fixture.detectChanges();

    //assert
    expect(matAutocomplete).toBeTruthy()
    expect(matAutocompleteDirective).toBe(matAutocomplete);
  });


  //TODO Coverage 100%

});
