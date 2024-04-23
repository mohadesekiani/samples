import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLogoutComponent } from './custom-logout.component';

describe('CustomLogoutComponent', () => {
  let component: CustomLogoutComponent;
  let fixture: ComponentFixture<CustomLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLogoutComponent]
    });
    fixture = TestBed.createComponent(CustomLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
