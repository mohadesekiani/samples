import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxGroupComponent } from './check-box-group.component';

xdescribe('CheckBoxGroupComponent', () => {
  let component: CheckBoxGroupComponent;
  let fixture: ComponentFixture<CheckBoxGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckBoxGroupComponent]
    });
    fixture = TestBed.createComponent(CheckBoxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
