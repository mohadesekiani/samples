import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateDrivenFormComponent } from './template-driven-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


describe('TemplateDrivenFormComponent', () => {
  let sut: TemplateDrivenFormComponent;
  let fixture: ComponentFixture<TemplateDrivenFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [
        TemplateDrivenFormComponent
      ],
      schemas: [
        // NO_ERRORS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(TemplateDrivenFormComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
