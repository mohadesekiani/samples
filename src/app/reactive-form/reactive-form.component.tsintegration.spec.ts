import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormComponent } from './reactive-form.component';


describe('ReactiveFormComponent', () => {
  let sut: ReactiveFormComponent;
  let fixture: ComponentFixture<ReactiveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [
        ReactiveFormComponent
      ],
      schemas: [
        // NO_ERRORS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(ReactiveFormComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
