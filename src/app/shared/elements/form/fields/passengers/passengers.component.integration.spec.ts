import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengersComponent } from './passengers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControlName } from '@angular/forms';
import { NumberPassengersComponent } from '../number-passengers/number-passengers.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { TestUtil } from 'src/app/core/utils/test';

describe('SUT(Integration): PassengersComponent', () => {
  let sut: PassengersComponent;
  let fixture: ComponentFixture<PassengersComponent>;
  let btnPassenger: HTMLButtonElement;
  let btnPassengerTrigger: MatMenuTrigger;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [PassengersComponent, NumberPassengersComponent],
    });
    fixture = TestBed.createComponent(PassengersComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    btnPassenger = TestUtil.nativeElement(fixture, '#btnPassenger');
    btnPassengerTrigger = TestUtil.directiveElement(fixture, MatMenuTrigger);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  // FIXME
  // check form is exist
  it('should test the presence of the form', () => {
    expect(sut.form).toBeTruthy();
  });

  it('should be test for binding form controls', () => {
    btnPassengerTrigger.openMenu();
    sut.showDrop = true;
    fixture.detectChanges();
    const adultCtrl = TestUtil.formControl(fixture, '[item-id=Adult]');
    const ChildCtrl = TestUtil.formControl(fixture, '[item-id=Child]');
    const InfantCtrl = TestUtil.formControl(fixture, '[item-id=Infant]');

    //act
    fixture.detectChanges();
    //assert
    expect(sut.form.controls.Adult).toBe(adultCtrl.control);
    expect(sut.form.controls.Child).toBe(ChildCtrl.control);
    expect(sut.form.controls.Infant).toBe(InfantCtrl.control);
  });
});
