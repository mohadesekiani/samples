import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FlightComponent } from './flight.component';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';

describe('SUT(integration): FlightComponent', () => {
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

  it('should return true for input less than 2 characters', () => {
    //Arrang
    const inputElement: HTMLInputElement = TestUtil.nativeElement(fixture, '#input');
    inputElement.value = 'S';

    expect(sut.filteredCities).toEqual([])
  });
   //TODO Coverage 100%

});
