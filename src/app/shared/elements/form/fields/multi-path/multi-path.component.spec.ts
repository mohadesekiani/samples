import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPathComponent } from './multi-path.component';

describe('MultiPathComponent', () => {
  let component: MultiPathComponent;
  let fixture: ComponentFixture<MultiPathComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiPathComponent]
    });
    fixture = TestBed.createComponent(MultiPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
