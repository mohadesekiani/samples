import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengersComponent as PassengersComponent } from './passengers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';

describe('SUT(Integration): PassengersComponent', () => {
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
    //drop = TestUtil.nativeElement(fixture, '#drop');
    //dropItem = TestUtil.nativeElement(fixture,'#dropItem');
    //btnDecr = TestUtil.nativeElement(fixture,'#btnDecr');
    fixture.detectChanges();
    spyOn(sut, 'incresed');
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  //(click)="showDrop = !showDrop"
  // FIXME
  // check form is exist
  xit('should set showDrop when click', () => {
    sut.showDrop = false;
    btnPassenger.click();
    fixture.detectChanges();
    // expect(sut.showDrop).toBe(true);
  });

  it('should be incresed called when click button', () => {
    // assert
    sut.showDrop = true;
    fixture.detectChanges();
    let btnIncr = TestUtil.nativeElement<HTMLButtonElement>(fixture, '#btnIncr');

    // act
    btnIncr.click();

    // assert
    expect(sut.incresed).toHaveBeenCalled();
  });

  it('should be decrees called when click button', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    let btnDecr = TestUtil.nativeElement<HTMLButtonElement>(fixture, '#btnDecr');
    spyOn(sut, 'decrees');
    btnDecr.click();

    // assert
    expect(sut.decrees).toHaveBeenCalled();
  });

  it('should be test for binding form controls"', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    const input = TestUtil.nativeElement(fixture, '#' + sut.passenger[0].name);
    debugger

    //act
    fixture.detectChanges();

    //assert
    // FIXME
    expect(input.formControlName).toBe(sut.passenger[0].name);
    expect(input.id).toBe(sut.passenger[0].name);
    expect(input.type).toBe('number');
  });
});
