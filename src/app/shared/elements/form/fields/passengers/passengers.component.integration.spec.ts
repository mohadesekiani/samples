import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengersComponent as PassengersComponent } from './passengers';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestUtil } from 'src/app/core/helpers/somtingHelpersTest';

describe('SUT(Integration): PassengersComponent', () => {
  let sut: PassengersComponent;
  let fixture: ComponentFixture<PassengersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [PassengersComponent],
    });
    fixture = TestBed.createComponent(PassengersComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(sut).toBeTruthy();
  });
  //(click)="showDrop = !showDrop"
  it('should set showDrop when click', () => {
    const btn: HTMLButtonElement = TestUtil.nativeElement(
      fixture,
      '#btnPassanger'
    );
    sut.showDrop = false;
    btn.click();
    fixture.detectChanges();
    expect(sut.showDrop).toBe(true);
  });
  //*ngIf="showDrop"
  it('', () => {
    const drop: HTMLButtonElement = TestUtil.nativeElement(fixture, '#drop');
  });
  //*ngFor="let item of passenger"
  it('', () => {
    const dropItem: HTMLButtonElement = TestUtil.nativeElement(
      fixture,
      '#dropItem'
    );
  });

  //(click)="item.increase ? item.increase(item) : increase(item); refersValue()"
  it('', () => {
    const btnIncr: HTMLButtonElement = TestUtil.nativeElement(
      fixture,
      '#btnIncr'
    );
  });
  // (click)="decrees(item); refersValue()"
  it('', () => {
    const btndecr: HTMLButtonElement = TestUtil.nativeElement(
      fixture,
      '#btndecr'
    );
  });
});
