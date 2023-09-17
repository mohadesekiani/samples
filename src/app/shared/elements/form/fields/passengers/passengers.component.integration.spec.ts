import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengersComponent } from './passengers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';
import { FormControlName } from '@angular/forms';

describe('SUT(Integration): PassengersComponent', () => {
  let sut: PassengersComponent;
  let fixture: ComponentFixture<PassengersComponent>;
  let btnPassenger: HTMLButtonElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [PassengersComponent],
    });
    fixture = TestBed.createComponent(PassengersComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    btnPassenger = TestUtil.nativeElement(fixture, '#btnPassenger');
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

  xit('should set showDrop when click', () => {
    sut.showDrop = false;
    btnPassenger.click();
    fixture.detectChanges();
    // expect(sut.showDrop).toBe(true);
  });

  it('should be test for binding form controls', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    const adultCtrl = TestUtil.formControl(fixture, '[item-id=Adult]');
    const ChildCtrl = TestUtil.formControl(fixture, '[item-id=Child]');
    const InfantCtrl = TestUtil.formControl(fixture, '[item-id=Infant]');
    
    //act
    fixture.detectChanges();
    //assert
    expect(sut.form.get('Adult')).toBe(adultCtrl.control);
    // FIXME
    expect(sut.form.get('Child')).toBe(ChildCtrl.control);
    expect(sut.form.get('Infant')).toBe(InfantCtrl.control);
  });

});
