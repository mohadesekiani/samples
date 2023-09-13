import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengersComponent as PassengersComponent } from './passengers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';
import { FormControlName } from '@angular/forms';

fdescribe('SUT(Integration): PassengersComponent', () => {
  let sut: PassengersComponent;
  let fixture: ComponentFixture<PassengersComponent>;
  let btnPassenger: HTMLButtonElement;
  //let btnIncr:HTMLButtonElement;
  // let drop;
  // let dropItem;
  // let btnDecr: HTMLButtonElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [PassengersComponent],
    });
    fixture = TestBed.createComponent(PassengersComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    btnPassenger = TestUtil.nativeElement(fixture, '#btnPassenger');
    // btnIncr = TestUtil.nativeElement(fixture, '#btnIncr');
    // drop = TestUtil.nativeElement(fixture, '#drop');
    //dropItem = TestUtil.nativeElement(fixture,'#dropItem');
    //btnDecr = TestUtil.nativeElement(fixture,'#btnDecr');
    fixture.detectChanges();
    // spyOn(sut, 'increased');
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  //(click)="showDrop = !showDrop"
  // FIXME
  // check form is exist
  it('should test the presence of the form', () => {
    sut.showDrop = true;
    fixture.detectChanges();

    const drop = TestUtil.nativeElement(fixture, '#drop');
    const formElement = TestUtil.querySelector(fixture, '#drop form');

    // assert
    expect(formElement).toBeTruthy();
  });

  xit('should set showDrop when click', () => {
    sut.showDrop = false;
    btnPassenger.click();
    fixture.detectChanges();
    // expect(sut.showDrop).toBe(true);
  });

  fit('should be test for binding form controls', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    const adultCtrl = TestUtil.formControl(fixture, '[item-id=Adult]');
    
    //act
    fixture.detectChanges();
    //assert
    expect(sut.form.get('Adult')).toBe(adultCtrl.control);
    // FIXME
    expect(sut.form.get('Child')).toBe(adultCtrl.control);
    expect(sut.form.get('Infant')).toBe(adultCtrl.control);
  });


});
