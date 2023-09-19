import { SharedModule } from 'src/app/shared/shared.module';
import { MultiPathsComponent } from './multi-paths.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SUT(Integration): MultiPathsComponent', () => {
  let sut: MultiPathsComponent;
  let fixture: ComponentFixture<MultiPathsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [MultiPathsComponent],
    });
    fixture = TestBed.createComponent(MultiPathsComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // assert
    expect(sut).toBeTruthy();
  });
});
