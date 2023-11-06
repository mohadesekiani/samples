import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFlightComponent } from './list-flight.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TestUtil } from 'src/app/core/utils/test';

xdescribe('SUT(Integration): ListFlightComponent', () => {
  let sut: ListFlightComponent;
  let fixture: ComponentFixture<ListFlightComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
        RouterModule,
      ],
      declarations: [ListFlightComponent],
    });

    fixture = TestBed.createComponent(ListFlightComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it(`should be set binding with proper value`, () => {

    // arrange
    const titleEl = TestUtil.nativeElement(fixture, '[item-id=title]');
    // action


    // assert
    expect(titleEl.textContent).toContain('xxxx');
  });

});
