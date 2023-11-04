import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyFlightComponent } from './company-flight.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('SUT(Integration): CompanyFlightComponent', () => {
  let sut: CompanyFlightComponent;
  let fixture: ComponentFixture<CompanyFlightComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        SharedModule,
      ],
      declarations: [CompanyFlightComponent],
    });

    fixture = TestBed.createComponent(CompanyFlightComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });
});
