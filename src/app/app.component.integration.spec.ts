import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractDataService } from './core/services/data/abstract-data.service';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';


describe('TemplateDrivenFormComponent', () => {
  let sut: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule,FormsModule,BrowserModule],
      declarations: [AppComponent],
      providers: [AbstractDataService],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
