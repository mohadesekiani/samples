import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseButtonComponent } from './increase-button.component';

describe('IncreaseButtonComponent', () => {
  let component: IncreaseButtonComponent;
  let fixture: ComponentFixture<IncreaseButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncreaseButtonComponent]
    });
    fixture = TestBed.createComponent(IncreaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
