import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengersComponent as PassengersComponent } from './passengers';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';

describe('SUT(Integration): PassengersComponent', () => {
  let sut: PassengersComponent;
  let fixture: ComponentFixture<PassengersComponent>;
  let btnPassenger: HTMLButtonElement;
  // let drop;
  // let dropItem;
  // let btnIncr;
  // let btnDecr: HTMLButtonElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [PassengersComponent],
    });
    fixture = TestBed.createComponent(PassengersComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    btnPassenger = TestUtil.nativeElement(fixture,'#btnPassenger');
    //drop = TestUtil.nativeElement(fixture, '#drop');
    //dropItem = TestUtil.nativeElement(fixture,'#dropItem');
    //btnIncr = TestUtil.nativeElement(fixture,'#btnIncr');
    //btnDecr = TestUtil.nativeElement(fixture,'#btnDecr');
    fixture.detectChanges();

  });
  it('should create', () => {
    expect(sut).toBeTruthy();
  });
  //(click)="showDrop = !showDrop"
  it('should set showDrop when click', () => {

    sut.showDrop = false;
    btnPassenger.click();
    fixture.detectChanges();
    expect(sut.showDrop).toBe(true);
  });
  //*ngIf="showDrop"
  it('should display the content when showDrop is true', () => {
    sut.showDrop = false;
    btnPassenger.click();
    fixture.detectChanges();
    expect( sut.showDrop).toBe(true);
  });

});
