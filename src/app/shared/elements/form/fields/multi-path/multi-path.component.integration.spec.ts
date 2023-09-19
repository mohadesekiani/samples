import { SharedModule } from 'src/app/shared/shared.module';
import { MultiPathComponent } from './multi-path.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SUT(Integration): MultiPathComponent', () => {
  let sut: MultiPathComponent;
  let fixture: ComponentFixture<MultiPathComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [MultiPathComponent],
    });
    fixture = TestBed.createComponent(MultiPathComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });
});
