import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ClassFlightComponent } from './class-flight.component';

xdescribe('SUT(Integration): ClassFlightComponent', () => {
  let sut: ClassFlightComponent;
  let fixture: ComponentFixture<ClassFlightComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        SharedModule,
      ],
      declarations: [ClassFlightComponent],
    });

    fixture = TestBed.createComponent(ClassFlightComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
