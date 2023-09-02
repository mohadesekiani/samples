import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PassengersComponent as PassengersComponent } from "./passengers";
import { SharedModule } from "src/app/shared/shared.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe('SUT(Integration): PassengersComponent',()=>{
  let sut: PassengersComponent;
  let fixture: ComponentFixture<PassengersComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations:[PassengersComponent],
    });
    fixture = TestBed.createComponent(PassengersComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();

  });
  it('should create', () => {
    expect(sut).toBeTruthy();
  });

})
