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
    expect(sut.showDrop).toBe(true);
  });

  it('should be incresed called when click button', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    let btnIncr: HTMLButtonElement = TestUtil.nativeElement(
      fixture,
      '#btnIncr'
    );
    spyOn(sut, 'incresed');
    btnIncr.click();
    fixture.detectChanges();
    expect(sut.incresed).toHaveBeenCalled();
  });

  it('should be decrees called when click button', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    let btnDecr: HTMLButtonElement = TestUtil.nativeElement(
      fixture,
      '#btnDecr'
    );
    spyOn(sut, 'decrees');
    btnDecr.click();
    fixture.detectChanges();
    expect(sut.decrees).toHaveBeenCalled();
  });

  // [formControlName]="item.name"
  it('should be test for binding [formControlName]="item.name"', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    const item = { value: 0, name: 'Adult' };
    let input = TestUtil.nativeElement(fixture, `#${item.name}`);
    sut.passenger[0] = item;
    input.formControlName = item.name;
    //act
    fixture.detectChanges();

    //assert
    expect(input.formControlName).toBe(sut.passenger[0].name);
  });

  it('should be test for binding [id]="item.name"', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    const item = { value: 0, name: 'Adult' };
    let input = TestUtil.nativeElement(fixture, `#${item.name}`);
    //act
    fixture.detectChanges();

    //assert
    expect(input.id).toBe(item.name);
  });

  it('should be test for binding type input', () => {
    sut.showDrop = true;
    fixture.detectChanges();
    const item = { value: 0, name: 'Adult' };
    let input = TestUtil.nativeElement(fixture, `#${item.name}`);
    //act
    fixture.detectChanges();

    //assert
    expect(input.type).toBe('number');
  });
});
